const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nama, email_utama, kata_sandi } = req.body;
  const db = req.app.get("db");

  try {
    const hashed = await bcrypt.hash(kata_sandi, 10);

    // insert user
    const [result] = await db.query(
      "INSERT INTO pengguna (nama, email_utama, kata_sandi) VALUES (?, ?, ?)",
      [nama, email_utama, hashed]
    );

    const userId = result.insertId;

    // insert default role
    await db.query(
      "INSERT INTO peran_pengguna (pengguna_id, peran) VALUES (?, 'pengguna')",
      [userId]
    );

    res.json({ message: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ error: "Gagal registrasi", detail: err });
  }
};

exports.login = async (req, res) => {
  const { email_utama, kata_sandi } = req.body;
  const db = req.app.get("db");

  try {
    // cari user berdasarkan email
    const [rows] = await db.query(
      "SELECT * FROM pengguna WHERE email_utama = ?",
      [email_utama]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Email tidak ditemukan" });
    }

    const user = rows[0];

    // cek password
    const match = await bcrypt.compare(kata_sandi, user.kata_sandi);
    if (!match) {
      return res.status(401).json({ error: "Kata sandi salah" });
    }

    // ambil semua role dari tabel peran_pengguna
    const [roles] = await db.query(
      "SELECT peran FROM peran_pengguna WHERE pengguna_id = ?",
      [user.id]
    );

    // validasi: user harus punya minimal 1 role
    if (roles.length === 0) {
      return res.status(403).json({ error: "User belum punya role" });
    }

    // buat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email_utama: user.email_utama,
        roles: roles.map(r => r.peran) // ✅ ini yang menggantikan user.peran
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login gagal", detail: err });
  }
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nama, email_utama, kata_sandi } = req.body;
  const db = req.app.get("db");

  try {
    const hashed = await bcrypt.hash(kata_sandi, 10);

    const [result] = await db.query(
      "INSERT INTO pengguna (nama, email_utama, kata_sandi) VALUES (?, ?, ?)",
      [nama, email_utama, hashed]
    );

    const userId = result.insertId;

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
  if (!req.body || !req.body.email_utama || !req.body.kata_sandi) {
    return res.status(400).json({ error: "Data login tidak lengkap" });
  }

  const { email_utama, kata_sandi } = req.body;
  const db = req.app.get("db");

  try {
    const [rows] = await db.query("SELECT * FROM pengguna WHERE email_utama = ?", [email_utama]);
    if (rows.length === 0) return res.status(401).json({ error: "Email tidak ditemukan" });

    const user = rows[0];
    const match = await bcrypt.compare(kata_sandi, user.kata_sandi);
    if (!match) return res.status(401).json({ error: "Kata sandi salah" });

    const [roles] = await db.query("SELECT peran FROM peran_pengguna WHERE pengguna_id = ?", [user.id]);
    if (roles.length === 0) return res.status(403).json({ error: "User belum punya role" });

    // Access token pendek umur
    const accessToken = jwt.sign(
      { id: user.id, email_utama: user.email_utama, roles: roles.map(r => r.peran) },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Refresh token panjang umur
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Simpan refresh token di DB
    await db.query("UPDATE pengguna SET refresh_token = ? WHERE id = ?", [refreshToken, user.id]);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login gagal", detail: err.message });
  }
};

exports.refresh = async (req, res) => {
  const db = req.app.get("db");
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Token tidak ada" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const [rows] = await db.query("SELECT * FROM pengguna WHERE id = ? AND refresh_token = ?", [payload.id, refreshToken]);
    if (rows.length === 0) return res.status(403).json({ error: "Token tidak valid" });

    const newAccessToken = jwt.sign(
      { id: payload.id, email_utama: rows[0].email_utama },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Token expired atau tidak valid" });
  }
};

exports.logout = async (req, res) => {
  const db = req.app.get("db");
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "Token tidak ada" });

  await db.query("UPDATE pengguna SET refresh_token = NULL WHERE refresh_token = ?", [refreshToken]);
  res.json({ message: "Logout berhasil" });
};

exports.me = (req, res) => {
  res.json({ user: req.user });
};

// controllers/roleController.js
exports.tambahRole = async (req, res) => {
  const { role } = req.body; // contoh: "pemilik_toko"
  const userId = req.user.id; // dari JWT

  const db = req.app.get("db");

  try {
    // cek apakah role sudah ada
    const [rows] = await db.query(
      "SELECT * FROM peran_pengguna WHERE pengguna_id=? AND peran=?",
      [userId, role]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "Role sudah aktif" });
    }

    // insert role baru
    await db.query(
      "INSERT INTO peran_pengguna (pengguna_id, peran) VALUES (?, ?)",
      [userId, role]
    );

    res.json({ message: `Role ${role} berhasil ditambahkan` });
  } catch (err) {
    res.status(500).json({ error: "Gagal menambahkan role", detail: err });
  }
};

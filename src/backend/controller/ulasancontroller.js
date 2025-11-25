// controller/ulasancontroller.js
// Tabel ulasan: id, pengguna_id, target_type ENUM('produk','spot','toko','event'),
// target_id, rating TINYINT, isi TEXT, dibuat_pada

exports.tambah = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { target_type, target_id, rating, isi } = req.body;

  try {
    const validTypes = ['produk','spot','toko','event'];
    if (!validTypes.includes(target_type)) {
      return res.status(400).json({ error: "target_type tidak valid" });
    }

    // Cegah ulasan ganda
    const [cek] = await db.query(
      "SELECT id FROM ulasan WHERE pengguna_id=? AND target_type=? AND target_id=?",
      [pengguna_id, target_type, target_id]
    );
    if (cek.length > 0) {
      return res.status(409).json({ error: "Anda sudah mengulas target ini" });
    }

    await db.query(
      "INSERT INTO ulasan (pengguna_id, target_type, target_id, rating, isi) VALUES (?, ?, ?, ?, ?)",
      [pengguna_id, target_type, target_id, rating, isi]
    );

    res.status(201).json({ message: "Ulasan ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByTarget = async (req, res) => {
  const db = req.app.get("db");
  const { target_type, target_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT u.id, u.rating, u.isi, u.dibuat_pada, p.nama AS pengulas
       FROM ulasan u JOIN pengguna p ON u.pengguna_id=p.id
       WHERE u.target_type=? AND u.target_id=?
       ORDER BY u.dibuat_pada DESC`,
      [target_type, target_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.summary = async (req, res) => {
  const db = req.app.get("db");
  const { target_type, target_id } = req.params;

  try {
    const [[sum]] = await db.query(
      "SELECT COUNT(*) AS total, ROUND(AVG(rating),2) AS rata FROM ulasan WHERE target_type=? AND target_id=?",
      [target_type, target_id]
    );
    res.json(sum || { total: 0, rata: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
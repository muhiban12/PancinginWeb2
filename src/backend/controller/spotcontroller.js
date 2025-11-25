// controller/spotcontroller.js
exports.buka = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { nama, deskripsi, gambar } = req.body;

  const [cek] = await db.query("SELECT id FROM spot WHERE pengguna_id=?", [pengguna_id]);
  if (cek.length > 0) return res.status(403).json({ error: "User hanya boleh punya 1 spot" });

  const [result] = await db.query(
    "INSERT INTO spot (pengguna_id, nama, deskripsi, gambar) VALUES (?, ?, ?, ?)",
    [pengguna_id, nama, deskripsi ?? null, gambar ?? null]
  );

  res.status(201).json({ message: "Spot berhasil dibuka", spot_id: result.insertId });
};

exports.list = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM spot ORDER BY dibuat_pada DESC");
  res.json(rows);
};

exports.detail = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM spot WHERE id=?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Spot tidak ditemukan" });
  res.json(rows[0]);
};
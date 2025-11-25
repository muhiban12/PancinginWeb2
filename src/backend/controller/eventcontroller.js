// controller/eventcontroller.js
// event: id, spot_id, nama, deskripsi, tanggal, kapasitas, harga, dibuat_pada

exports.tambah = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id, nama, deskripsi, tanggal, kapasitas, harga } = req.body;

  try {
    await db.query(
      "INSERT INTO event (spot_id, nama, deskripsi, tanggal, kapasitas, harga) VALUES (?, ?, ?, ?, ?, ?)",
      [spot_id, nama, deskripsi ?? null, tanggal, kapasitas, harga ?? 0]
    );
    res.status(201).json({ message: "Event ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listBySpot = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [rows] = await db.query("SELECT * FROM event WHERE spot_id=?", [req.params.spot_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.detail = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [[row]] = await db.query("SELECT * FROM event WHERE id=?", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Event tidak ditemukan" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
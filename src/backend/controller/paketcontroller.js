// controller/paketcontroller.js

// Tambah paket baru
exports.tambah = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id, nama, deskripsi, harga, durasi_jam } = req.body;
  await db.query(
    "INSERT INTO paket (spot_id, nama, deskripsi, harga, durasi_jam) VALUES (?, ?, ?, ?, ?)",
    [spot_id, nama, deskripsi ?? null, harga, durasi_jam]
  );
  res.status(201).json({ message: "Paket ditambahkan" });
};

// List paket per spot
exports.listBySpot = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM paket WHERE spot_id=?", [req.params.spot_id]);
  res.json(rows);
};

// Cek paket available (paket dianggap terpakai kalau ada booking aktif dengan paket_id itu)
exports.available = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id } = req.query;

  const [rows] = await db.query(
    `SELECT p.id, p.nama, p.harga, p.durasi_jam,
       CASE WHEN EXISTS (
         SELECT 1 FROM booking b
         WHERE JSON_EXTRACT(b.snapshoot, '$.paket_id') = p.id
           AND b.status IN ('menunggu','dikonfirmasi')
       ) THEN 0 ELSE 1 END AS available
     FROM paket p WHERE p.spot_id=?`,
    [spot_id]
  );

  res.json(rows);
};
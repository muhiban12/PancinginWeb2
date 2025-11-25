// controller/kursicontroller.js

// Tambah kursi baru
exports.tambah = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id, nomor_lapak } = req.body;
  await db.query("INSERT INTO kursi (spot_id, nomor_lapak) VALUES (?, ?)", [spot_id, nomor_lapak]);
  res.status(201).json({ message: "Kursi ditambahkan" });
};

// List kursi per spot
exports.listBySpot = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM kursi WHERE spot_id=?", [req.params.spot_id]);
  res.json(rows);
};

// Cek kursi available untuk durasi tertentu
exports.available = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id, durasi_jam } = req.query;

  const mulai = new Date();
  const selesai = new Date(mulai.getTime() + durasi_jam * 60 * 60 * 1000);

  const [rows] = await db.query(
    `SELECT k.id, k.nomor_lapak,
       CASE WHEN EXISTS (
         SELECT 1 FROM booking b
         WHERE b.kursi_id=k.id 
           AND b.status IN ('menunggu','dikonfirmasi')
           AND JSON_EXTRACT(b.snapshoot, '$.mulai') <= ?
           AND JSON_EXTRACT(b.snapshoot, '$.selesai') > ?
       ) THEN 0 ELSE 1 END AS available
     FROM kursi k WHERE k.spot_id=?`,
    [selesai, mulai, spot_id]
  );

  res.json(rows);
};
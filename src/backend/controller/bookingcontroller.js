// controller/bookingcontroller.js
// booking: id, pengguna_id, spot_id, kursi_id, status ENUM('menunggu','dikonfirmasi','dibatalkan'), snapshoot TEXT, dibuat_pada

// Buat booking baru
exports.buat = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { spot_id, kursi_id, paket_id, durasi_jam, catatan } = req.body;

  // hitung waktu mulai & selesai
  const mulai = new Date();
  const selesai = new Date(mulai.getTime() + durasi_jam * 60 * 60 * 1000);

  // cek overlap booking
  const [cek] = await db.query(
    `SELECT id FROM booking 
     WHERE kursi_id=? AND status IN ('menunggu','dikonfirmasi')
       AND JSON_EXTRACT(snapshoot, '$.mulai') <= ?
       AND JSON_EXTRACT(snapshoot, '$.selesai') > ?`,
    [kursi_id, selesai, mulai]
  );
  if (cek.length > 0) return res.status(409).json({ error: "Kursi sudah dibooking di jam ini" });

  const snapshoot = JSON.stringify({ spot_id, kursi_id, paket_id, mulai, selesai, catatan });

  await db.query(
    "INSERT INTO booking (pengguna_id, spot_id, kursi_id, status, snapshoot) VALUES (?, ?, ?, 'menunggu', ?)",
    [pengguna_id, spot_id, kursi_id, snapshoot]
  );

  res.status(201).json({ message: "Booking dibuat", mulai, selesai });
};

// Konfirmasi booking oleh pemilik spot
exports.konfirmasi = async (req, res) => {
  const db = req.app.get("db");
  await db.query("UPDATE booking SET status='dikonfirmasi' WHERE id=?", [req.params.id]);
  res.json({ message: "Booking dikonfirmasi" });
};

// Batalkan booking
exports.batal = async (req, res) => {
  const db = req.app.get("db");
  await db.query("UPDATE booking SET status='dibatalkan' WHERE id=?", [req.params.id]);
  res.json({ message: "Booking dibatalkan" });
};

// Detail booking
exports.detail = async (req, res) => {
  const db = req.app.get("db");
  const [[bk]] = await db.query(
    `SELECT b.*, s.nama AS spot_nama, k.nomor_lapak
     FROM booking b
     JOIN spot s ON b.spot_id=s.id
     JOIN kursi k ON b.kursi_id=k.id
     WHERE b.id=?`, [req.params.id]
  );
  if (!bk) return res.status(404).json({ error: "Booking tidak ditemukan" });
  res.json(bk);
};

// List booking user
exports.listByUser = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM booking WHERE pengguna_id=? ORDER BY dibuat_pada DESC", [req.user.id]);
  res.json(rows);
};

// List booking masuk (pemilik spot)
exports.listMasuk = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query(
    `SELECT b.*, u.nama AS pembooking_nama, s.nama AS spot_nama, k.nomor_lapak
     FROM booking b
     JOIN pengguna u ON b.pengguna_id=u.id
     JOIN spot s ON b.spot_id=s.id
     JOIN kursi k ON b.kursi_id=k.id
     WHERE s.pengguna_id=? ORDER BY b.dibuat_pada DESC`,
    [req.user.id]
  );
  res.json(rows);
};

// Cek kursi available untuk paket durasi tertentu
exports.available = async (req, res) => {
  const db = req.app.get("db");
  const { spot_id, durasi_jam } = req.query;
  const mulai = new Date();
  const selesai = new Date(mulai.getTime() + durasi_jam * 60 * 60 * 1000);

  const [rows] = await db.query(
    `SELECT k.id, k.nomor_lapak,
       CASE WHEN EXISTS (
         SELECT 1 FROM booking b
         WHERE b.kursi_id=k.id AND b.status IN ('menunggu','dikonfirmasi')
           AND JSON_EXTRACT(b.snapshoot, '$.mulai') <= ?
           AND JSON_EXTRACT(b.snapshoot, '$.selesai') > ?
       ) THEN 0 ELSE 1 END AS available
     FROM kursi k WHERE k.spot_id=?`,
    [selesai, mulai, spot_id]
  );

  res.json(rows);
};
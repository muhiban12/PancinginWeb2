// controller/bookingeventcontroller.js
// booking_event: id, pengguna_id, event_id, status ENUM('menunggu','dikonfirmasi','dibatalkan'), dibuat_pada

exports.buat = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { event_id, jumlah_tiket } = req.body;

  try {
    // cek event ada
    const [[ev]] = await db.query("SELECT * FROM event WHERE id=?", [event_id]);
    if (!ev) return res.status(404).json({ error: "Event tidak ditemukan" });

    // cek kapasitas
    const [[count]] = await db.query(
      "SELECT COUNT(*) AS total FROM booking_event WHERE event_id=? AND status IN ('menunggu','dikonfirmasi')",
      [event_id]
    );
    if (count.total >= ev.kapasitas) {
      return res.status(409).json({ error: "Kapasitas event sudah penuh" });
    }

    // cek sudah daftar
    const [cek] = await db.query(
      "SELECT id FROM booking_event WHERE pengguna_id=? AND event_id=?",
      [pengguna_id, event_id]
    );
    if (cek.length > 0) return res.status(409).json({ error: "Anda sudah booking event ini" });

    await db.query(
      "INSERT INTO booking_event (pengguna_id, event_id, status, jumlah_tiket) VALUES (?, ?, 'menunggu', ?)",
      [pengguna_id, event_id, jumlah_tiket ?? 1]
    );

    res.status(201).json({ message: "Booking event dibuat, status: menunggu" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.konfirmasi = async (req, res) => {
  const db = req.app.get("db");
  try {
    await db.query("UPDATE booking_event SET status='dikonfirmasi' WHERE id=?", [req.params.id]);
    res.json({ message: "Booking event dikonfirmasi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.batal = async (req, res) => {
  const db = req.app.get("db");
  try {
    await db.query("UPDATE booking_event SET status='dibatalkan' WHERE id=?", [req.params.id]);
    res.json({ message: "Booking event dibatalkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listByUser = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [rows] = await db.query(
      `SELECT be.*, e.nama AS event_nama, e.tanggal
       FROM booking_event be 
       JOIN event e ON be.event_id=e.id
       WHERE be.pengguna_id=? ORDER BY be.dibuat_pada DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMasuk = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [rows] = await db.query(
      `SELECT be.*, u.nama AS peserta_nama, e.nama AS event_nama, e.tanggal
       FROM booking_event be
       JOIN pengguna u ON be.pengguna_id=u.id
       JOIN event e ON be.event_id=e.id
       JOIN spot s ON e.spot_id=s.id
       WHERE s.pengguna_id=? ORDER BY be.dibuat_pada DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
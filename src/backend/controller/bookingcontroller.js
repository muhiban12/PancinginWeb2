// src/backend/controller/bookingController.js

// ==============================
// BUAT BOOKING SLOT WAKTU (MULTI PAKET BERURUTAN)
// ==============================
exports.tambah = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user?.id;

  try {
    const { spot_id, kursi_id, paket_ids, tanggal, alamat_id } = req.body;

    if (!pengguna_id) return res.status(401).json({ error: "Unauthorized" });
    if (!spot_id || !kursi_id || !Array.isArray(paket_ids) || paket_ids.length === 0 || !tanggal || !alamat_id) {
      return res.status(400).json({ error: "Field wajib: spot_id, kursi_id, paket_ids(array), tanggal, alamat_id" });
    }

    // 1) Ambil data paket
    const [paketRows] = await db.query(
      "SELECT id, spot_id, mulai, selesai, harga FROM paket WHERE id IN (?) ORDER BY mulai ASC",
      [paket_ids]
    );
    if (paketRows.length !== paket_ids.length) {
      return res.status(400).json({ error: "Beberapa paket tidak ditemukan" });
    }

    // 2) Validasi spot & waktu paket
    for (const p of paketRows) {
      if (p.spot_id != spot_id) return res.status(400).json({ error: "Paket harus dari spot yang sama" });
      if (!p.mulai || !p.selesai) return res.status(400).json({ error: "Paket belum memiliki waktu mulai/selesai" });
    }

    // 3) Paket harus berurutan/menyambung
    for (let i = 0; i < paketRows.length - 1; i++) {
      if (paketRows[i].selesai !== paketRows[i + 1].mulai) {
        return res.status(400).json({ error: "Paket tidak berurutan. Pilih slot waktu yang saling menyambung." });
      }
    }

    // 4) Bentuk rentang waktu actual
    const mulai_waktu = `${tanggal} ${paketRows[0].mulai}`;
    const selesai_waktu = `${tanggal} ${paketRows[paketRows.length - 1].selesai}`;

    // 5) Cek bentrok kursi
    const [overlap] = await db.query(
      `SELECT id FROM booking
       WHERE kursi_id = ?
         AND status <> 'dibatalkan'
         AND NOT (booking.selesai_waktu <= ? OR booking.mulai_waktu >= ?)
       LIMIT 1`,
      [kursi_id, mulai_waktu, selesai_waktu]
    );
    if (overlap.length > 0) {
      return res.status(409).json({ error: "Kursi sudah dibooking pada rentang waktu tersebut" });
    }

    // 6) Hitung total harga
    let totalHarga = 0;
    paketRows.forEach(p => (totalHarga += Number(p.harga)));

    // 7) Insert booking utama
    const [ins] = await db.query(
      `INSERT INTO booking
       (pengguna_id, spot_id, kursi_id, paket_id, alamat_id, waktu_booking, status, harga_snapshot, mulai_waktu, selesai_waktu)
       VALUES (?, ?, ?, ?, ?, NOW(), 'menunggu', ?, ?, ?)`,
      [
        pengguna_id,
        spot_id,
        kursi_id,
        paketRows[0].id, // paket pertama sebagai referensi
        alamat_id,
        totalHarga,
        mulai_waktu,
        selesai_waktu
      ]
    );
    const booking_id = ins.insertId;

    // 8) Insert pasangan booking-paket
    const values = paketRows.map(p => [booking_id, p.id]);
    await db.query("INSERT INTO booking_paket (booking_id, paket_id) VALUES ?", [values]);

    return res.status(201).json({
      message: "Booking berhasil dibuat",
      booking_id,
      mulai_waktu,
      selesai_waktu,
      total: totalHarga
    });
  } catch (err) {
    console.error("Booking tambah error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// CEK SLOT TERSEDIA (PER KURSI)
// ==============================
exports.available = async (req, res) => {
  const db = req.app.get("db");
  try {
    const { spot_id, kursi_id, tanggal } = req.query;
    if (!spot_id || !kursi_id || !tanggal) {
      return res.status(400).json({ error: "Query wajib: spot_id, kursi_id, tanggal" });
    }

    const [slots] = await db.query(
      "SELECT id, mulai, selesai FROM paket WHERE spot_id=? ORDER BY mulai ASC",
      [spot_id]
    );

    const result = [];
    for (const s of slots) {
      const mulai_waktu = `${tanggal} ${s.mulai}`;
      const selesai_waktu = `${tanggal} ${s.selesai}`;
      const [[cnt]] = await db.query(
        `SELECT COUNT(*) AS total FROM booking
         WHERE kursi_id = ?
           AND status <> 'dibatalkan'
           AND NOT (booking.selesai_waktu <= ? OR booking.mulai_waktu >= ?)`,
        [kursi_id, mulai_waktu, selesai_waktu]
      );
      result.push({
        paket_id: s.id,
        mulai: s.mulai,
        selesai: s.selesai,
        available: cnt.total === 0
      });
    }

    return res.json(result);
  } catch (err) {
    console.error("Booking available error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// DETAIL BOOKING
// ==============================
exports.detail = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [[row]] = await db.query(
      `SELECT b.*, s.nama AS spot_nama, k.nomor_lapak
       FROM booking b
       JOIN spot s ON b.spot_id = s.id
       JOIN kursi k ON b.kursi_id = k.id
       WHERE b.id = ?`,
      [req.params.id]
    );
    if (!row) return res.status(404).json({ error: "Booking tidak ditemukan" });
    return res.json(row);
  } catch (err) {
    console.error("Booking detail error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// KONFIRMASI BOOKING (PEMILIK SPOT)
// ==============================
exports.konfirmasi = async (req, res) => {
  const db = req.app.get("db");
  try {
    await db.query("UPDATE booking SET status='dikonfirmasi' WHERE id=?", [req.params.id]);
    return res.json({ message: "Booking dikonfirmasi" });
  } catch (err) {
    console.error("Booking konfirmasi error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// BATALKAN BOOKING
// ==============================
exports.batal = async (req, res) => {
  const db = req.app.get("db");
  try {
    await db.query("UPDATE booking SET status='dibatalkan' WHERE id=?", [req.params.id]);
    return res.json({ message: "Booking dibatalkan" });
  } catch (err) {
    console.error("Booking batal error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// LIST BOOKING USER (PEMBELI)
// ==============================
exports.listByUser = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [rows] = await db.query(
      `SELECT b.*, s.nama AS spot_nama, k.nomor_lapak
       FROM booking b
       JOIN spot s ON b.spot_id = s.id
       JOIN kursi k ON b.kursi_id = k.id
       WHERE b.pengguna_id=? ORDER BY b.waktu_booking DESC`,
      [req.user.id]
    );
    return res.json(rows);
  } catch (err) {
    console.error("Booking listByUser error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

// ==============================
// LIST BOOKING MASUK (PEMILIK SPOT)
// ==============================
exports.listMasuk = async (req, res) => {
  const db = req.app.get("db");
  try {
    const [rows] = await db.query(
      `SELECT b.*, u.nama AS pembooking_nama, s.nama AS spot_nama, k.nomor_lapak
       FROM booking b
       JOIN pengguna u ON b.pengguna_id = u.id
       JOIN spot s ON b.spot_id = s.id
       JOIN kursi k ON b.kursi_id = k.id
       WHERE s.pengguna_id=? ORDER BY b.waktu_booking DESC`,
      [req.user.id]
    );
    return res.json(rows);
  } catch (err) {
    console.error("Booking listMasuk error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

exports.buat = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { nama, deskripsi, alamat } = req.body;

  try {
    // cek apakah user sudah punya toko
    const [cekToko] = await db.query("SELECT id FROM toko WHERE pengguna_id = ?", [pengguna_id]);
    if (cekToko.length > 0) {
      return res.status(403).json({ error: "User sudah punya toko" });
    }

    // buat toko baru
    const [result] = await db.query(
      "INSERT INTO toko (nama, deskripsi, alamat, pengguna_id) VALUES (?, ?, ?, ?)",
      [nama, deskripsi, alamat, pengguna_id]
    );

    // cek role pemilik_toko
    const [cekRole] = await db.query(
      "SELECT * FROM peran_pengguna WHERE pengguna_id = ? AND peran = 'pemilik_toko'",
      [pengguna_id]
    );
    if (cekRole.length === 0) {
      await db.query(
        "INSERT INTO peran_pengguna (pengguna_id, peran) VALUES (?, 'pemilik_toko')",
        [pengguna_id]
      );
    }

    res.status(201).json({ message: "Toko berhasil dibuat", toko_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM toko");
  res.json(rows);
};

exports.detail = async (req, res) => {
  const db = req.app.get("db");
  const [rows] = await db.query("SELECT * FROM toko WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: "Toko tidak ditemukan" });
  res.json(rows[0]);
};

exports.produkToko = async (req, res) => {
  const db = req.app.get("db");
  const toko_id = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM produk WHERE toko_id = ?", [toko_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔧 Update toko
exports.update = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;
  const { nama, deskripsi, alamat } = req.body;

  try {
    const [cekToko] = await db.query("SELECT * FROM toko WHERE pengguna_id = ?", [pengguna_id]);
    if (cekToko.length === 0) {
      return res.status(404).json({ error: "Toko tidak ditemukan" });
    }

    await db.query(
      "UPDATE toko SET nama = ?, deskripsi = ?, alamat = ? WHERE pengguna_id = ?",
      [nama, deskripsi, alamat, pengguna_id]
    );

    res.json({ message: "Toko berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🚮 Hapus toko + produk
exports.hapus = async (req, res) => {
  const db = req.app.get("db");
  const pengguna_id = req.user.id;

  try {
    const [cekToko] = await db.query("SELECT * FROM toko WHERE pengguna_id = ?", [pengguna_id]);
    if (cekToko.length === 0) {
      return res.status(404).json({ error: "Toko tidak ditemukan" });
    }

    const toko_id = cekToko[0].id;

    // hapus semua produk milik toko
    await db.query("DELETE FROM produk WHERE toko_id = ?", [toko_id]);

    // hapus toko
    await db.query("DELETE FROM toko WHERE id = ?", [toko_id]);

    // cabut role pemilik_toko
    await db.query("DELETE FROM peran_pengguna WHERE pengguna_id = ? AND peran = 'pemilik_toko'", [pengguna_id]);

    res.json({ message: "Toko dan semua produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
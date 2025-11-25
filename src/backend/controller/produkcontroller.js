const Produk = require("../models/produkModel");

exports.tambah = async (req, res) => {
  try {
    const db = req.app.get("db");
    const pengguna_id = req.user.id;

    // cek apakah user punya toko
    const [toko] = await db.query(
      "SELECT id FROM toko WHERE pengguna_id = ?",
      [pengguna_id]
    );

    if (toko.length === 0) {
      return res.status(403).json({ error: "User belum punya toko" });
    }

    const toko_id = toko[0].id;

    const id = await Produk.create({
      ...req.body,
      toko_id,
    });

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      id: id,
    });
  } catch (err) {
    console.error("Error tambah produk:", err);
    res.status(500).json({ error: err.message });
  }
};

// ⭐ Endpoint LIST PRODUK (DIPAKAI = router.get("/"))
exports.list = async (req, res) => {
  try {
    const db = req.app.get("db");
    const [rows] = await db.query("SELECT * FROM produk");
    res.json(rows);
  } catch (err) {
    console.error("Error list produk:", err);
    res.status(500).json({ error: "Gagal mengambil semua produk" });
  }
};

exports.detail = async (req, res) => {
  try {
    const item = await Produk.findById(req.params.id);

    if (!item)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(item);
  } catch (err) {
    console.error("Error detail produk:", err);
    res.status(500).json({ error: "Gagal mengambil detail produk" });
  }
};

exports.update = async (req, res) => {
  try {
    await Produk.update(req.params.id, req.body);
    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    console.error("Error update produk:", err);
    res.status(500).json({ error: "Gagal memperbarui produk" });
  }
};

exports.hapus = async (req, res) => {
  try {
    await Produk.remove(req.params.id);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("Error hapus produk:", err);
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
};

exports.listByToko = async (req, res) => {
  try {
    const db = req.app.get("db");
    const toko_id = req.params.toko_id;

    const [rows] = await db.query(
      "SELECT * FROM produk WHERE toko_id = ?",
      [toko_id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error list produk by toko:", err);
    res.status(500).json({ error: err.message });
  }
};

const Produk = require("../models/produkModel");

exports.tambah = async (req, res) => {
  try {
    const db = req.app.get("db");
    const pengguna_id = req.user.id;

    // ambil toko_id dari user login
    const [toko] = await db.query("SELECT id FROM toko WHERE pengguna_id = ?", [pengguna_id]);
    if (toko.length === 0) {
      return res.status(403).json({ error: "User belum punya toko" });
    }
    const toko_id = toko[0].id;

    const id = await Produk.create({ ...req.body, toko_id });
    res.status(201).json({ message: "Produk berhasil ditambahkan", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  const produk = await Produk.findAll();
  res.json(produk);
};

exports.detail = async (req, res) => {
  const item = await Produk.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Produk tidak ditemukan" });
  res.json(item);
};

exports.update = async (req, res) => {
  await Produk.update(req.params.id, req.body);
  res.json({ message: "Produk berhasil diupdate" });
};

exports.hapus = async (req, res) => {
  await Produk.remove(req.params.id);
  res.json({ message: "Produk berhasil dihapus" });
};

exports.listByToko = async (req, res) => {
  const db = req.app.get("db");
  const toko_id = req.params.toko_id;

  try {
    const [rows] = await db.query("SELECT * FROM produk WHERE toko_id = ?", [toko_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
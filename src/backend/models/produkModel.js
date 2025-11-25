const db = require("../config/db");

// CREATE
exports.create = async (data) => {
  const sql = `
    INSERT INTO produk 
    (nama, harga, stok, deskripsi_singkat, deskripsi_lengkap, gambar, toko_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    data.nama,
    data.harga,
    data.stok,
    data.deskripsi_singkat,
    data.deskripsi_lengkap,
    data.gambar || null,
    data.toko_id,
  ]);

  return result.insertId;
};

// GET ALL
exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM produk ORDER BY id DESC");
  return rows;
};

// GET BY ID
exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM produk WHERE id = ?", [id]);
  return rows[0] || null;
};

// UPDATE
exports.update = async (id, data) => {
  const sql = `
    UPDATE produk 
    SET 
      nama = COALESCE(?, nama),
      harga = COALESCE(?, harga),
      stok = COALESCE(?, stok),
      deskripsi_singkat = COALESCE(?, deskripsi_singkat),
      deskripsi_lengkap = COALESCE(?, deskripsi_lengkap),
      gambar = COALESCE(?, gambar)
    WHERE id = ?
  `;

  await db.query(sql, [
    data.nama,
    data.harga,
    data.stok,
    data.deskripsi_singkat,
    data.deskripsi_lengkap,
    data.gambar || null,
    id,
  ]);
};

// DELETE
exports.remove = async (id) => {
  await db.query("DELETE FROM produk WHERE id = ?", [id]);
};

const db = require("../config/db");

exports.create = async (data) => {
  const sql = `
    INSERT INTO produk (nama, harga, stok, deskripsi_singkat, deskripsi_lengkap, gambar, toko_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [
    data.nama,
    data.harga,
    data.stok,
    data.deskripsi_singkat,
    data.deskripsi_lengkap,
    data.gambar || null,
    data.toko_id
  ]);
  return result.insertId;
};

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM produk");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM produk WHERE id = ?", [id]);
  return rows[0];
};

exports.update = async (id, data) => {
  const sql = `
    UPDATE produk SET nama=?, harga=?, stok=?, deskripsi_singkat=?, deskripsi_lengkap=?, gambar=? 
    WHERE id=?
  `;
  await db.query(sql, [
    data.nama,
    data.harga,
    data.stok,
    data.deskripsi_singkat,
    data.deskripsi_lengkap,
    data.gambar || null,
    id
  ]);
};

exports.remove = async (id) => {
  await db.query("DELETE FROM produk WHERE id = ?", [id]);
};
import api from "./api";

export default {
  getAll() {
    return api.get("/produk");
  },

  getById(id) {
    return api.get(`/produk/${id}`);
  },

  getByToko(toko_id) {
    return api.get(`/produk/toko/${toko_id}`);
  },

  create(data) {
    return api.post("/produk/tambah", data);
  },

  update(id, data) {
    return api.put(`/produk/${id}`, data);
  },

  delete(id) {
    return api.delete(`/produk/${id}`);
  }
};

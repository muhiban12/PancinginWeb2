import api from "./api";

export default {
  getAll() {
    return api.get("/ulasan");
  },

  getById(id) {
    return api.get(`/ulasan/${id}`);
  },

  getByProduk(id) {
    return api.get(`/ulasan/produk/${id}`);
  },

  create(data) {
    return api.post("/ulasan/tambah", data);
  },

  delete(id) {
    return api.delete(`/ulasan/${id}`);
  }
};

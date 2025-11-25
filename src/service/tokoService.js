import api from "./api";

export default {
  getAll() {
    return api.get("/toko");
  },

  getById(id) {
    return api.get(`/toko/${id}`);
  },

  create(data) {
    return api.post("/toko/tambah", data);
  },

  update(id, data) {
    return api.put(`/toko/${id}`, data);
  },

  delete(id) {
    return api.delete(`/toko/${id}`);
  }
};

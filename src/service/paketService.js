import api from "./api";

export default {
  getAll() {
    return api.get("/paket");
  },

  getById(id) {
    return api.get(`/paket/${id}`);
  },

  create(data) {
    return api.post("/paket/tambah", data);
  },

  update(id, data) {
    return api.put(`/paket/${id}`, data);
  },

  delete(id) {
    return api.delete(`/paket/${id}`);
  }
};

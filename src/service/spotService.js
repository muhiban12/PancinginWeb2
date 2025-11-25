import api from "./api";

export default {
  getAll() {
    return api.get("/spot");
  },

  getById(id) {
    return api.get(`/spot/${id}`);
  },

  create(data) {
    return api.post("/spot/tambah", data);
  },

  update(id, data) {
    return api.put(`/spot/${id}`, data);
  },

  delete(id) {
    return api.delete(`/spot/${id}`);
  }
};

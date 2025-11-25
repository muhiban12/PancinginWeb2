import api from "./api";

export default {
  getAll() {
    return api.get("/kursi");
  },

  getById(id) {
    return api.get(`/kursi/${id}`);
  },

  create(data) {
    return api.post("/kursi/tambah", data);
  },

  update(id, data) {
    return api.put(`/kursi/${id}`, data);
  },

  delete(id) {
    return api.delete(`/kursi/${id}`);
  }
};

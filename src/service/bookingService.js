import api from "./api";

export default {
  getAll() {
    return api.get("/booking");
  },

  getById(id) {
    return api.get(`/booking/${id}`);
  },

  getByUser(userId) {
    return api.get(`/booking/pengguna/${userId}`);
  },

  create(data) {
    return api.post("/booking/tambah", data);
  },

  update(id, data) {
    return api.put(`/booking/${id}`, data);
  },

  delete(id) {
    return api.delete(`/booking/${id}`);
  }
};

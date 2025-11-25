import api from "./api";

export default {
  getAll() {
    return api.get("/bookingevent");
  },

  getById(id) {
    return api.get(`/bookingevent/${id}`);
  },

  getByUser(userId) {
    return api.get(`/bookingevent/pengguna/${userId}`);
  },

  create(data) {
    return api.post("/bookingevent/tambah", data);
  },

  delete(id) {
    return api.delete(`/bookingevent/${id}`);
  }
};

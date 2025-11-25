import api from "./api";

export default {
  getAll() {
    return api.get("/event");
  },

  getById(id) {
    return api.get(`/event/${id}`);
  },

  create(data) {
    return api.post("/event/tambah", data);
  },

  update(id, data) {
    return api.put(`/event/${id}`, data);
  },

  delete(id) {
    return api.delete(`/event/${id}`);
  }
};

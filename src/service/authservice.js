import api from "./api";

export default {
  login(data) {
    return api.post("/auth/login", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  getProfile() {
    return api.get("/auth/profile");
  },
};

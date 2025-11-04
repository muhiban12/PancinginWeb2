<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm sticky-top">
      <router-link class="navbar-brand fw-bold" to="/">Pancingin</router-link>
  
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/spots">Lokasi</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/booking">Booking</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/store">Toko</router-link>
          </li>
        </ul>
  
        <ul class="navbar-nav">
          <!-- If NOT logged in -->
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
  
          <!-- If LOGGED IN -->
          <li v-else class="nav-item">
            <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Navbar",
    data() {
      return {
        // dummy login state (nanti bisa pakai Vuex / pinia)
        isLoggedIn: false
      };
    },
    methods: {
      logout() {
        this.isLoggedIn = false;
        this.$router.push("/login");
      }
    }
  };
  </script>
  
  <style scoped>
  .nav-link.router-link-exact-active {
    font-weight: bold;
    color: #0d6efd !important; /* Bootstrap primary */
  }
  </style>
  
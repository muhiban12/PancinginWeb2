<template>
    <section class="profile-page">
      <div class="profile-container">
        <img :src="profilePic" alt="Foto Profil" class="profile-pic" />
  
        <h2 class="mb-3">Profil Pengguna</h2>
  
        <div v-if="user">
          <p><strong>Nama:</strong> {{ user.name }}</p>
          <!-- <p><strong>Username:</strong> {{ user.username }}</p> -->
          <p><strong>Email:</strong> {{ user.email }}</p>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
  
        <div v-else>
          <p class="text-muted">Data pengguna tidak ditemukan.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProfileView',
    data() {
      return {
        user: null,
        profilePic: 'https://i.pravatar.cc/150' // avatar random, bisa diganti
      };
    },
    mounted() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #caf0f8, #ade8f4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }
  
  .profile-container {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 3px solid #0077b6;
  }
  
  .logout-btn {
    margin-top: 20px;
    padding: 10px 16px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .logout-btn:hover {
    background-color: #d62828;
  }
  </style>
<template>
  <div class="home-container">
    
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="title">Selamat Datang di Pancingin 🎣</h1>
      <p class="subtitle">
        Temukan lokasi pemancingan terbaik, booking tempat dengan mudah, dan beli perlengkapan memancing secara online!
      </p>

      <div class="btn-group">
        <router-link class="btn main-btn" to="/spots">Cari Lokasi</router-link>
        <router-link class="btn sec-btn" to="/booking">Booking Tempat</router-link>
        <router-link class="btn sec-btn" to="/store">Toko Pancing</router-link>
      </div>
    </section>

    <!-- Feature Section -->
    <section class="features">
      <h2>Kenapa Pancingin?</h2>
      <div class="feature-list">

        <div class="feature-card">
          <h3>🎣 Lokasi Pemancingan</h3>
          <p>Temukan spot pemancingan terdekat dan terbaik.</p>
        </div>

        <div class="feature-card">
          <h3>📅 Booking Online</h3>
          <p>Pesan tempat memancing tanpa ribet dan tanpa antri.</p>
        </div>

        <div class="feature-card">
          <h3>🛒 Toko Perlengkapan</h3>
          <p>Beli alat pancing dan umpan langsung di aplikasi.</p>
        </div>

      </div>
    </section>
    
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px;
  font-family: "Poppins", sans-serif;
}

/* Hero */
.hero {
  padding: 60px 20px;
  background: linear-gradient(135deg, #4dbfff, #0072ff);
  color: white;
  border-radius: 12px;
}

.title {
  font-size: 32px;
  font-weight: bold;
}

.subtitle {
  margin-top: 10px;
  font-size: 18px;
  opacity: 0.9;
}

.btn-group {
  margin-top: 25px;
}

.btn {
  padding: 12px 20px;
  margin: 0 10px;
  text-decoration: none;
  border-radius: 8px;
  display: inline-block;
  font-weight: 600;
  transition: 0.3s;
}

.main-btn {
  background: white;
  color: #0072ff;
}

.sec-btn {
  background: rgba(255, 255, 255, 0.8);
  color: #005fcc;
}

.btn:hover {
  opacity: 0.8;
}

/* Features */
.features {
  margin-top: 50px;
}

.feature-list {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.feature-card {
  background: #f9f9f9;
  padding: 20px;
  width: 260px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.feature-card h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #0072ff;
}
</style>

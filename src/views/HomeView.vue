<template>
  <!-- Hero Section -->
  <section class="hero">
    <!-- <header class="navbar">
      <div class="logo">🎣 Pancingin<span>.com</span></div>
      <nav>
        <a href="#">Beranda</a>
        <a href="#">Event</a>
        <a href="#">Tempat</a>
        <a href="#">Kontak</a>
        <button class="login-btn">Login</button>
      </nav>
    </header> -->

    <div class="hero-content">
      <h1>Mau mancing kemana hari ini?</h1>
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Cari tempat mancing terdekat..." 
          v-model="keyword" 
          @keyup.enter="search"/>
        <!-- <button>Cari</button> -->
      </div>
    </div>
  </section>

  <!-- Event Highlight -->
  <!-- <section class="event-highlight" id="eventHighlight">
    <div class="event-card">
      <h2>🎉 10.10 FISHING FEST 10 Hari Strike, Hadiah 10 Kali Lipat!</h2>
      <p>Bergabunglah di event mancing terbesar tahun ini, nikmati diskon & menangkan hadiah spektakuler!</p>
      <button class="register-btn">Daftar Sekarang</button>
    </div>
  </section> -->
  <EventCarousel />

  <!-- Section Pemancingan -->
  <!-- <section class="places">
    <h2>Pemancingan Terdekat</h2>
    <div class="place-list">
      <div class="place-card"><img src="https://picsum.photos/300/200?1"><h3>Nama Tempat Pemancingan</h3></div>
      <div class="place-card"><img src="https://picsum.photos/300/200?2"><h3>Nama Tempat Pemancingan</h3></div>
      <div class="place-card"><img src="https://picsum.photos/300/200?3"><h3>Nama Tempat Pemancingan</h3></div>
    </div>
  </section> -->
  <FishingSpotSlider />
  <ProductGrid />
</template>

<script>
import EventCarousel from '@/components/EventCarousel.vue';
import FishingSpotSlider from '@/components/FishingSpotSlider.vue';
import ProductGrid from '@/components/ProductGrid.vue';

export default {
  name: "HomeView",

  components: { EventCarousel, FishingSpotSlider, ProductGrid},

  data() {
    return {
      keyword: "" // untuk menyimpan teks input pencarian
    };
  },

  // mounted() {
  //   const eventSection = document.getElementById('eventHighlight');
  //   window.addEventListener('scroll', () => {
  //     const revealPoint = window.innerHeight / 1.3;
  //     const top = eventSection.getBoundingClientRect().top;
  //     if (top < revealPoint) {
  //       eventSection.classList.add('visible');
  //     }
  //   });
  // },

  methods: {
    search() {
      if (!this.keyword.trim()) return;

      console.log("🔍 Mencari:", this.keyword);

      // arahkan user ke halaman lokasi dengan query pencarian
      this.$router.push({
        path: "/spots",
        query: { q: this.keyword }
      });
    }
  }
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  color: #222;
  background: #f7f9fc;
  overflow-x: hidden;
}

/* --- HERO SECTION --- */
.hero {
  position: relative;
  height: 120vh;
  background: url('@/assets/marlin.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #f7f9fc);
  z-index: 1;
}

/* Navbar */
.navbar {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 20px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 10;
}

.navbar a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  transition: 0.3s;
}

.navbar a:hover {
  color: #ffdd57;
}

.logo {
  font-weight: bold;
  font-size: 1.4rem;
}

.logo span {
  color: #ffdd57;
}

.login-btn {
  background: #ffdd57;
  border: none;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

/* Hero content */
.hero-content {
  z-index: 2;
  color: white;
  position: relative;

  /* naikkan posisi */
  margin-top: -80px; /* adjust sesuai kebutuhan */
}

.hero-content h1 {
  font-family: 'Merienda', cursive;
  font-weight: 700;
  font-size: 2rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.35);
}

.search-box {
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 50px;
  overflow: hidden;
}

.search-box input {
  border: none;
  padding: 10px 20px;
  width: 300px;
  background: transparent;
  color: white;
}

.search-box input::placeholder {
  color: #eee;
}

/* .search-box button {
  background: #ffdd57;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
} */

/* --- EVENT HIGHLIGHT --- */
.event-highlight {
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 1s ease, transform 1s ease;
  padding: 100px 0;
}

.event-highlight.visible {
  opacity: 1;
  transform: translateY(0);
}

.event-card {
  background: #004aad;
  color: white;
  padding: 40px;
  border-radius: 20px;
  width: 80%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.event-card h2 {
  margin-bottom: 15px;
}

.register-btn {
  background: #ffdd57;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  margin-top: 15px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
}

/* --- PLACES --- */
.places {
  margin-top: 40px;
  padding: 40px 80px;
}

.places h2 {
  text-align: center;
  margin-bottom: 30px;
}

.place-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.place-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s ease;
}

.place-card:hover {
  transform: translateY(-8px);
}

.place-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.place-card h3 {
  padding: 15px;
}

/* Responsif */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 10px;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .search-box input {
    width: 200px;
  }

  .event-card {
    width: 90%;
    padding: 25px;
  }

  .places {
    padding: 20px;
  }
}
</style>

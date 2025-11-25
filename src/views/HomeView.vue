<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Mau mancing kemana hari ini?</h1>
        <div class="search-box">
          <input
            type="text"
            placeholder="Cari tempat mancing terdekat..."
            v-model="keyword"
            @keyup.enter="search"
          />
        </div>
      </div>
    </section>

    <!-- Konten utama -->
    <div class="main-content">
      <EventCarousel />
      <FishingSpotSlider />
      <ProductGrid />
    </div>
  </div>
</template>

<script>
import EventCarousel from '@/components/EventCarousel.vue';
import FishingSpotSlider from '@/components/FishingSpotSlider.vue';
import ProductGrid from '@/components/ProductGrid.vue';

export default {
  name: "HomeView",
  components: { EventCarousel, FishingSpotSlider, ProductGrid },
  data() {
    return { keyword: "" };
  },
  methods: {
    search() {
      if (!this.keyword.trim()) return;
      this.$router.push({ path: "/spots", query: { q: this.keyword } });
    }
  }
};
</script>

<style scoped>
.home-page {
  padding-top: 0 !important;
  width: 100%;
  max-width: none;
  padding: 0;
  margin: 0;
}

/* Hero Section */
.hero {
  padding-top: -70px;
  margin-top: -70px;
  min-height: 120vh;
  background: url('@/assets/marlin.jpg') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 5px 20px 80px;
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

.hero-content {
  z-index: 2;
  color: white;
  position: relative;
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
  margin-top: 20px; 
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

/* Konten utama */
.main-content {
  padding: 60px 20px;
  background: #f7f9fc;
  position: relative;
  z-index: 2;
}

/* Responsif */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
  .search-box input {
    width: 200px;
  }
}
</style>
<template>
  <div class="spot-detail-page">
    <!-- Navbar -->
    <Navbar />

    <!-- Cuaca & Maps -->
    <section class="weather-map-section container my-4">
      <div class="row g-4">
        <!-- Cuaca -->
        <div class="col-md-6">
          <div class="card shadow-sm p-3">
            <h5 class="fw-bold mb-2">🌤️ Cuaca Hari Ini</h5>
            <p class="mb-1">Suhu: {{ weather.temp }}°C</p>
            <p class="mb-0">Kondisi: {{ weather.desc }}</p>
          </div>
        </div>

        <!-- Maps -->
        <div class="col-md-6">
          <div class="card shadow-sm p-3">
            <h5 class="fw-bold mb-2">📍 Lokasi Pemancingan</h5>
            <MapBox :lat="spot.lat" :lng="spot.lng" :title="spot.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- Gambar Utama -->
    <section class="main-image container my-4">
      <img :src="spot.image" class="img-fluid rounded shadow" />
    </section>

    <!-- Info Spot -->
    <section class="spot-info container my-4">
      <h2 class="fw-bold">{{ spot.name }}</h2>
      <p class="text-muted">{{ spot.description }}</p>
      <p><strong>Jam Operasional:</strong> {{ spot.schedule }}</p>
    </section>

    <!-- Overview -->
    <section class="overview container my-4">
      <h4 class="fw-bold mb-3">📖 Overview</h4>
      <p>{{ spot.overview }}</p>
    </section>

    <!-- Ulasan -->
    <section class="reviews container my-4">
      <h4 class="fw-bold mb-3">💬 Ulasan Pemancing</h4>
      <div v-for="review in reviews" :key="review.id" class="card p-3 mb-3 shadow-sm">
        <p class="mb-1"><strong>{{ review.user }}</strong> ⭐ {{ review.rating }}</p>
        <p class="mb-0">{{ review.comment }}</p>
      </div>
    </section>

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import MapBox from '@/components/MapBox.vue';

export default {
  name: "FishingSpotDetail",
  components: { Navbar, Footer, MapBox },
  data() {
    return {
      weather: { temp: 28, desc: "Cerah berawan" }, // nanti pakai API
      spot: {
        name: "Pemancingan Cimaung",
        lat: -6.973,
        lng: 107.572,
        description: "Tempat pemancingan populer dengan suasana alami.",
        schedule: "Buka setiap hari 07:00 - 18:00",
        image: "https://picsum.photos/800/400?random=1",
        overview: "Pemancingan ini menyediakan kolam ikan air tawar, fasilitas saung, dan area parkir luas."
      },
      reviews: [
        { id: 1, user: "Andi", rating: 5, comment: "Tempatnya nyaman, ikannya banyak!" },
        { id: 2, user: "Siti", rating: 4, comment: "Harga terjangkau, cocok untuk keluarga." }
      ]
    };
  },
  mounted() {
    // Inisialisasi Google Maps
    
  }
};
</script>

<style scoped>
.spot-detail-page {
  background: #f7f9fc;
  padding-top: 90px; /* beri jarak dari navbar fixed */
}
.main-image img {
  max-height: 400px;
  object-fit: cover;
}
</style>
<template>
  <div class="spot-detail-page">
    <template v-if="spot">
      <!-- Cuaca Ringkas -->
      <section class="container my-3">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h6 class="fw-bold mb-1">🌤️ Cuaca Hari Ini</h6>
            <small>{{ weatherNow.condition }} | {{ weatherNow.temperature }}°C | {{ weatherNow.humidity }}% RH</small>
          </div>
          <div class="d-flex gap-2 flex-wrap">
            <span
              v-for="(forecast, i) in weather7Days.slice(0, 3)"
              :key="i"
              class="badge bg-light text-dark"
            >
              {{ forecast.date }}: {{ forecast.temperature }}°C
            </span>
          </div>
        </div>
      </section>

      <!-- Gambar + Tombol Booking -->
      <section class="container my-4">
        <div class="row g-4 align-items-start">
          <div class="col-md-6">
            <img :src="spot.images[0]" class="img-fluid rounded shadow mb-2" />
            <div class="d-flex gap-2 flex-wrap">
              <img
                v-for="(img, i) in spot.images.slice(1)"
                :key="i"
                :src="img"
                class="img-thumbnail"
                style="width: 80px; height: 80px; object-fit: cover;"
              />
            </div>
          </div>

          <div class="col-md-6">
            <h5 class="fw-bold">🎟️ Booking Tempat</h5>
            <p class="text-muted">Klik tombol untuk pilih jam & kursi.</p>
            <button class="btn btn-success mt-2" @click="showModal = true">
              Booking Langsung
            </button>
          </div>
        </div>
      </section>

      <!-- Overview + Lokasi -->
      <section class="container my-3">
        <h5 class="fw-bold">📖 Overview</h5>
        <p class="mb-2">{{ spot.overview }}</p>
        <p class="text-muted"><strong>📍 Lokasi:</strong> {{ spot.location }}</p>
      </section>

      <!-- Fasilitas & Aturan -->
      <section class="container my-3">
        <h5 class="fw-bold">🏕️ Fasilitas & Aturan</h5>
        <p>{{ spot.rules }}</p>
      </section>

      <!-- Ulasan -->
      <section class="container my-4 review-section">
        <h5 class="fw-bold mb-3">💬 Ulasan Pemancing</h5>
        <div v-for="review in reviews" :key="review.id" class="card p-3 mb-2 shadow-sm">
          <p class="mb-1"><strong>{{ review.name }}</strong> ⭐ {{ review.rating }}</p>
          <p class="mb-0">{{ review.comment }}</p>
        </div>
      </section>
    </template>

    <template v-else>
      <div class="text-center my-5">
        <div class="spinner-border"></div>
        <p>Loading...</p>
      </div>
    </template>

    <!-- Pop-up Booking -->
    <BookingFlowModal
      v-if="showModal"
      @checkout="handleCheckout"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import BookingFlowModal from "@/components/BookingFlowModal.vue"

export default {
  components: { BookingFlowModal },
  data() {
    return {
      showModal: false,
      spot: {
        name: "Pemancingan Cimaung",
        images: [
          "https://picsum.photos/800/400?random=1",
          "https://picsum.photos/100/100?random=2",
          "https://picsum.photos/100/100?random=3"
        ],
        overview: "Spot pemancingan alami dengan kolam air tawar dan saung santai.",
        location: "Jl. Raya Cimaung No. 88, Bandung Selatan",
        rules: "Dilarang membawa umpan hidup. Anak-anak wajib didampingi. Dilarang merokok di area kolam."
      },
      weatherNow: { temperature: 25, humidity: 95, condition: "Berawan" },
      weather7Days: [
        { date: "24 Nov", temperature: 25, humidity: 95, condition: "Berawan" },
        { date: "25 Nov", temperature: 25, humidity: 94, condition: "Berawan" },
        { date: "26 Nov", temperature: 25, humidity: 93, condition: "Berawan" }
      ],
      reviews: [
        { id: 1, name: "Alan", rating: 5, comment: "Tempatnya nyaman, ikannya banyak!" },
        { id: 2, name: "Budi", rating: 4, comment: "Fasilitas lengkap, cocok buat keluarga." },
        { id: 3, name: "Citra", rating: 5, comment: "Pemandangan bagus, spot bersih." }
      ]
    }
  },
  methods: {
    handleCheckout(data) {
      console.log("Booking data:", data)
      this.$router.push({ name: "CheckOutPage", query: data })
    }
  }
}
</script>

<style scoped>
.spot-detail-page {
  padding-top: 70px;
}
.review-section {
  background-color: #e9f7ff;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #cce6ff;
}
.img-thumbnail {
  object-fit: cover;
  height: 80px;
}
</style>
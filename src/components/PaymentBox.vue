<template>
  <div class="card payment-card shadow-sm p-4 sticky-top">
    <h5 class="mb-4 d-flex align-items-center text-primary">
      <iconify-icon icon="mdi:credit-card-outline" class="me-2"></iconify-icon>
      Metode Pembayaran
    </h5>

    <!-- Box Promo -->
    <div class="promo-box mb-4">
      <label for="promo" class="form-label fw-semibold">Kode Promo</label>
      <div class="input-group">
        <input type="text" id="promo" class="form-control" placeholder="Masukkan kode promo" />
        <button class="btn btn-outline-primary">Pakai</button>
      </div>
    </div>

    <!-- Metode Pembayaran -->
    <div class="list-group mb-4">
      <label class="list-group-item payment-option">
        <input type="radio" name="pay" class="form-check-input me-2" checked />
        BCA Virtual Account
      </label>
      <label class="list-group-item payment-option">
        <input type="radio" name="pay" class="form-check-input me-2" />
        Mandiri Virtual Account
      </label>
      <label class="list-group-item payment-option">
        <input type="radio" name="pay" class="form-check-input me-2" />
        Gopay / OVO / Dana
      </label>
    </div>

    <!-- Ringkasan -->
    <div class="summary-box mb-3">
      <div class="d-flex justify-content-between">
        <span>Total Barang</span>
        <span>Rp12.000</span>
      </div>
      <div class="d-flex justify-content-between">
        <span>Ongkos Kirim</span>
        <span>Rp15.000</span>
      </div>
      <div class="d-flex justify-content-between fw-bold fs-6 border-top pt-2 mt-2">
        <span>Total Tagihan</span>
        <span class="text-success">Rp27.000</span>
      </div>
    </div>

    <!-- Tombol Bayar -->
    <button
      class="btn btn-success w-100 d-flex align-items-center justify-content-center"
      @click="handlePayment"
    >
      <iconify-icon icon="mdi:fishing" class="me-2"></iconify-icon>
      Bayar Sekarang
    </button>

    <p class="text-center mt-3 small text-muted">
      Dengan membayar, kamu menyetujui proteksi pengiriman & asuransi ikan 🐟
    </p>

    <!-- Overlay Fullscreen -->
    <div v-if="isLoading || showSuccess" class="overlay-glass">
      <div class="overlay-content">
        <div v-if="isLoading" class="text-center">
          <div class="spinner-border text-light mb-3"></div>
          <p class="text-light">Memproses Pembayaran...</p>
        </div>
        <div v-else class="text-center animate-fade">
          <iconify-icon icon="mdi:check-circle-outline" class="text-success mb-2" width="48" />
          <h5 class="text-light">Pembayaran Berhasil 🎉</h5>
          <p class="text-light small">Mengalihkan ke halaman produk...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const showSuccess = ref(false)
const router = useRouter()

function handlePayment() {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    showSuccess.value = true

    setTimeout(() => {
      router.push('/product/1') // Ganti dengan ID produk dinamis jika perlu
    }, 2000)
  }, 1500)
}
</script>

<style scoped>
.payment-card {
  border-radius: 16px;
  background: linear-gradient(to bottom right, #e0f4ff, #ffffff);
  border: 1px solid #cce6ff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
}

@media (min-width: 992px) {
  .sticky-top {
    position: sticky;
    top: 80px;
    z-index: 10;
  }
}

.payment-option {
  border: none;
  background-color: #f0faff;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}
.payment-option:hover {
  background-color: #d9f0ff;
}

.promo-box {
  background-color: #f0faff;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d0eaff;
}

.summary-box {
  background-color: #f8fcff;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d0eaff;
}

.btn-success {
  background-color: #0099cc;
  border: none;
  font-weight: 600;
  padding: 12px;
  border-radius: 10px;
}
.btn-success:hover {
  background-color: #0077aa;
}

.overlay-glass {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(6px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
}

.animate-fade {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

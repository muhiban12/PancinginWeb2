<template>
  <div class="booking-overlay">
    <div class="booking-card">
      <!-- Header + tombol keluar -->
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="fw-bold mb-0">🎣 Booking Pemancingan</h5>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Info harga awal -->
      <div class="price-info mb-3">
        <small class="text-muted">
          💰 Harga: Rp20.000 per jam | Paket hemat 3 jam = Rp55.000
        </small>
      </div>

      <!-- Step 1: Jam -->
      <div v-if="step === 1">
        <p class="mb-2">Pilih slot jam:</p>
        <div class="slot-grid">
          <label v-for="slot in jamSlots" :key="slot" class="slot-item">
            <input type="checkbox" :value="slot" v-model="selectedSlots" />
            {{ slot }}
          </label>
        </div>
        <button class="btn btn-primary w-100 mt-3"
                @click="nextStep"
                :disabled="selectedSlots.length === 0">
          Lanjut Pilih Kursi
        </button>
      </div>

      <!-- Step 2: Kursi -->
      <div v-else-if="step === 2">
        <p class="mb-2">Pilih kursi:</p>

        <!-- Gambar denah kursi -->
        <div class="seat-image mb-3 text-center">
          <img :src="seatMapImg" alt="Denah Kursi" class="img-fluid rounded shadow" />
          <p class="mt-2 text-muted">
            💺 Harga dasar: Rp20.000/jam | Paket hemat 3 jam = Rp55.000
          </p>
        </div>

        <!-- Grid kursi -->
        <div class="seat-grid">
          <button
            v-for="spot in spots"
            :key="spot.id"
            :disabled="spot.booked"
            :class="['seat', { selected: selectedSpot === spot.id, booked: spot.booked }]"
            @click="selectedSpot = spot.id"
          >
            {{ spot.label }}
          </button>
        </div>

        <button class="btn btn-primary w-100 mt-3"
                @click="nextStep"
                :disabled="!selectedSpot">
          Lanjut Ringkasan
        </button>
      </div>

      <!-- Step 3: Ringkasan -->
      <div v-else>
        <p class="mb-1"><strong>Slot:</strong> {{ selectedSlots.join(', ') }}</p>
        <p class="mb-1"><strong>Kursi:</strong> {{ selectedSpot }}</p>
        <p class="mb-1"><strong>Durasi:</strong> {{ selectedSlots.length }} jam</p>
        <p class="mb-2"><strong>Total:</strong> Rp{{ hitungHarga(selectedSlots.length).toLocaleString() }}</p>
        <button class="btn btn-success w-100 mt-3" @click="checkout">Bayar Sekarang</button>
      </div>
    </div>
  </div>
</template>

<script>
import seatMapImg from "@/assets/seatMap.png"

export default {
  name: "BookingFlowModal",
  props: { show: Boolean },
  data() {
    return {
      step: 1,
      selectedSlots: [],
      selectedSpot: null,
      seatMapImg,
      jamSlots: [
        "07:00 - 08:00","08:00 - 09:00","09:00 - 10:00","10:00 - 11:00",
        "11:00 - 12:00","12:00 - 13:00","13:00 - 14:00","14:00 - 15:00",
        "15:00 - 16:00","16:00 - 17:00","17:00 - 18:00","18:00 - 19:00",
        "19:00 - 20:00","20:00 - 21:00"
      ],
      spots: [
        // Baris A
        { id: "A1", label: "Kursi A1", booked: false },
        { id: "A2", label: "Kursi A2", booked: false },
        { id: "A3", label: "Kursi A3", booked: false },
        { id: "A4", label: "Kursi A4", booked: false },
        { id: "A5", label: "Kursi A5", booked: true },
        { id: "A6", label: "Kursi A6", booked: true },
        { id: "A7", label: "Kursi A7", booked: false },
        { id: "A8", label: "Kursi A8", booked: false },
        { id: "A9", label: "Kursi A9", booked: false },
        { id: "A10", label: "Kursi A10", booked: false },
        // Baris B
        { id: "B1", label: "Kursi B1", booked: false },
        { id: "B2", label: "Kursi B2", booked: true },
        { id: "B3", label: "Kursi B3", booked: false },
        { id: "B4", label: "Kursi B4", booked: false },
        { id: "B5", label: "Kursi B5", booked: false },
        { id: "B6", label: "Kursi B6", booked: false },
        { id: "B7", label: "Kursi B7", booked: false },
        { id: "B8", label: "Kursi B8", booked: false },
        { id: "B9", label: "Kursi B9", booked: true },
        { id: "B10", label: "Kursi B10", booked: false }
      ]
    }
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++
    },
    hitungHarga(jumlahJam) {
      const paket3 = Math.floor(jumlahJam / 3)
      const sisaJam = jumlahJam % 3
      let harga = paket3 * 55000
      harga += sisaJam * 20000
      return harga
    },
    checkout() {
      this.$emit("checkout", {
        slots: this.selectedSlots,
        spot: this.selectedSpot,
        total: this.hitungHarga(this.selectedSlots.length)
      })
    }
  }
}
</script>

<style scoped>
.seat-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 kursi per baris */
  gap: 0.6rem;
}
.seat {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #003366;
  background: #f0f0f0;
  text-align: center;
  font-weight: 500;
}
.seat.selected {
  background: #1565c0;
  color: #fff;
}
.seat.booked {
  background: #ccc;
  cursor: not-allowed;
}
</style>

<style scoped>
.booking-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.booking-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  width: 550px;           /* ← dari 380px → 520px */
  max-width: 100%;
  padding: 1.5rem 1.2rem; /* ← tambahin padding horizontal */
  position: relative;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
}
.price-info {
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
}
.slot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}
.slot-item {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  cursor: pointer;
  transition: 0.2s;
}
.slot-item:hover {
  background: #e0f0ff;
}
.slot-item input {
  margin-right: 0.6rem;
}
.seat-image img {
  max-width: 100%;
  height: auto;
}
.seat-image p {
  font-size: 0.9rem;
}
.seat-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 kursi per baris */
  gap: 0.6rem;
}
.seat {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #003366;
  background: #f0f0f0;
  text-align: center;
  font-weight: 500;
}
.seat.selected {
  background: #1565c0;
  color: #fff;
}
.seat.booked {
  background: #ccc;
  cursor: not-allowed;
}
</style>
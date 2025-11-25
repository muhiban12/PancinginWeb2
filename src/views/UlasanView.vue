<template>
  <div class="status-page">
    <h1>Ulasan</h1>
    <p class="subtitle">Pesanan yang menunggu ulasan dari pelanggan.</p>

    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-info">
          <strong>Pesanan #{{ order.id }}</strong>
          <span>{{ order.product }} ({{ order.qty }} item)</span>
          <span>Selesai pada {{ order.date }}</span>
        </div>

        <button class="btn-action">
          Tulis Ulasan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UlasanView",
  data() {
    return {
      orders: [
        { id: 501, product: "Jam Tangan", qty: 1, date: "19 Nov 2025" },
        { id: 502, product: "Dompet Kulit", qty: 1, date: "19 Nov 2025" }
      ]
    }
  }
}
</script>

<style scoped>
.status-page {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #003366;
}

.subtitle {
  margin-bottom: 2rem;
  color: #555;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .order-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

.order-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  color: #003366;
}

.btn-action {
  align-self: flex-start;
  background: #003366;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.btn-action:hover {
  background: #0055aa;
}
</style>
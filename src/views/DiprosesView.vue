<template>
  <div class="status-page">
    <h1>Diproses</h1>
    <p class="subtitle">Pesanan yang sedang diproses oleh penjual.</p>

    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-info">
          <strong>Pesanan #{{ order.id }}</strong>
          <span>{{ order.product }} ({{ order.qty }} item)</span>
          <span>Total: Rp{{ order.total }}</span>

          <span v-if="order.status === 'dibayar'" class="status pending">
            Pembayaran diterima, pesanan sedang diproses
          </span>
          <span v-else-if="order.status === 'dikirim'" class="status success">
            Pesanan sudah dikemas dan sedang dikirim
          </span>
          <span v-else-if="order.status === 'selesai'" class="status done">
            Pesanan selesai
          </span>
          <span v-else-if="order.status === 'dibatalkan'" class="status failed">
            Pesanan dibatalkan
          </span>
        </div>

        <button class="btn-action">
          Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiprosesView",
  data() {
    return {
      orders: [
        { id: 201, product: "Tas Ransel", qty: 1, total: "300.000", status: "dibayar" },
        { id: 202, product: "Buku Catatan", qty: 3, total: "90.000", status: "dikirim" }
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

.status.pending {
  color: #f57c00;
  font-weight: 600;
}

.status.success {
  color: #2e7d32;
  font-weight: 600;
}

.status.done {
  color: #1565c0;
  font-weight: 600;
}

.status.failed {
  color: #c62828;
  font-weight: 600;
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
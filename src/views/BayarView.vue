<template>
  <div class="status-page">
    <h1>Konfirmasi Pembayaran</h1>
    <p class="subtitle">Status pembayaran pesanan kamu.</p>

    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <strong>Pesanan #{{ order.id }}</strong>
        </div>
        <div class="order-body">
          <p><strong>Produk:</strong> {{ order.product }} ({{ order.qty }} item)</p>
          <p><strong>Total:</strong> Rp{{ order.total }}</p>
          <p><strong>Status:</strong> {{ statusText(order.status) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BayarView",
  data() {
    return {
      orders: [
        { id: 101, product: "Sepatu Sneakers", qty: 1, total: "250.000", status: "dibayar" },
        { id: 102, product: "Kaos Polos", qty: 2, total: "120.000", status: "dikirim" }
      ]
    }
  },
  methods: {
    statusText(status) {
      return {
        dibayar: "Menunggu konfirmasi penjual",
        dikirim: "Pembayaran dikonfirmasi, barang akan segera dikirim",
        selesai: "Pesanan selesai",
        dibatalkan: "Pesanan dibatalkan"
      }[status]
    }
  }
}
</script>

<style scoped>
/* ===== Base Layout ===== */
.status-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 100px; /* offset navbar */
  font-family: 'Poppins', sans-serif;
  color: #003366;
}

/* ===== Typography ===== */
h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  margin-bottom: 2rem;
  color: #555;
  font-size: 0.95rem;
}

.order-body p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
  color: #003366;
}

/* ===== Order List Layout ===== */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .order-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* ===== Order Card ===== */
.order-card {
  background: #e6f0ff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
}

.location {
  background: #1565c0;
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

/* ===== Status Badge ===== */
.status {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.status.dibayar {
  background: #f57c00; /* orange */
}

.status.dikirim {
  background: #2e7d32; /* green */
}

.status.selesai {
  background: #1565c0; /* blue */
}

.status.dibatalkan {
  background: #c62828; /* red */
}

/* ===== Divider (optional) ===== */
.divider {
  margin: 0 0.5rem;
  color: #999;
}
</style>
<template>
  <div class="status-page">
    <h1>Dikirim</h1>
    <p class="subtitle">Pesanan kamu sedang dalam perjalanan. Berikut detail pengiriman:</p>

    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <strong>Pesanan #{{ order.id }}</strong>
          <span class="location">📦 Saat ini di {{ order.location }}</span>
        </div>
        <div class="order-body">
          <p><strong>Produk:</strong> {{ order.product }} ({{ order.qty }} item)</p>
          <p><strong>Tanggal Kirim:</strong> {{ order.date }}</p>
          <p>
            <strong>Kurir:</strong> {{ order.courier }}
            <span class="divider">|</span>
            <strong>Resi:</strong> {{ order.tracking }}
          </p>
          <p>
            <strong>Status:</strong>
            <span class="status dikirim">Sedang dalam perjalanan</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DikirimView",
  data() {
    return {
      orders: [
        {
          id: 301,
          product: "Jaket Hoodie",
          qty: 1,
          date: "24 Nov 2025",
          courier: "JNE",
          tracking: "JNE123456",
          location: "DC Bandung"
        },
        {
          id: 302,
          product: "Topi Baseball",
          qty: 2,
          date: "24 Nov 2025",
          courier: "SiCepat",
          tracking: "SCP987654",
          location: "DC Jakarta"
        }
      ]
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
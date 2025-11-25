<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <header>
          <h2>Notifikasi</h2>
          <button @click="close">×</button>
        </header>

        <section class="transaksi">
          <h3>Transaksi</h3>
          <div class="grid">
            <NotifItem :icon="bayarIcon" label="Bayar" />
            <NotifItem :icon="diprosesIcon" label="Diproses" />
            <NotifItem :icon="dikirimIcon" label="Dikirim" />
            <NotifItem :icon="tibaIcon" label="Sudah tiba" />
            <NotifItem :icon="ulasanIcon" label="Ulasan" />
          </div>
        </section>

        <section class="pesan">
          <h3>Pesan</h3>
          <ul class="pesan-list">
            <li v-for="(msg, i) in messages" :key="i">{{ msg }}</li>
          </ul>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import NotifItem from './NotifItem.vue'
import bayarIcon from '@/assets/bayar.png'
import diprosesIcon from '@/assets/diproses.png'
import dikirimIcon from '@/assets/dikirim.png'
import tibaIcon from '@/assets/tiba.png'
import ulasanIcon from '@/assets/ulasan.png'

export default {
  props: {
    visible: Boolean
  },
  components: {
    NotifItem
  },
  data() {
    return {
      bayarIcon,
      diprosesIcon,
      dikirimIcon,
      tibaIcon,
      ulasanIcon,
      messages: [
        "Produk baru tersedia 🧴",
        "Pesanan #123 sedang diproses",
        "Event memancing minggu depan, jangan lupa daftar!"
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* jarak antar section */
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.transaksi {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.transaksi h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #003366;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.pesan {
  margin-top: 1rem;
}

.pesan h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #003366;
}

.pesan-list {
  padding-left: 0;
  list-style: none;
}

.pesan-list li {
  margin-bottom: 0.75rem;
  background: #f0f8ff;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #003366;
  font-weight: 500;
}
</style>


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
            <router-link to="/bayar" class="notif-link" @click.native="close">
              <NotifItem :icon="bayarIcon" label="Status Bayar" />
            </router-link>
            <router-link to="/diproses" class="notif-link" @click.native="close">
              <NotifItem :icon="diprosesIcon" label="Diproses" />
            </router-link>
            <router-link to="/dikirim" class="notif-link" @click.native="close">
              <NotifItem :icon="dikirimIcon" label="Dikirim" />
            </router-link>
            <router-link to="/tiba" class="notif-link" @click.native="close">
              <NotifItem :icon="tibaIcon" label="Sudah tiba" />
            </router-link>
            <router-link to="/ulasan" class="notif-link" @click.native="close">
              <NotifItem :icon="ulasanIcon" label="Ulasan" />
            </router-link>
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
        "Pesanan #983 sedang diproses",
        "Event menarik minggu depan, jangan lupa daftar!"
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
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  color: #222;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}
header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.transaksi h3,
.pesan h3 {
  font-size: 1.1rem;
  color: #003366;
  margin-bottom: 0.75rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}
.notif-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}
.notif-link:hover {
  transform: scale(1.05);
}
.pesan-list {
  list-style: none;
  padding: 0;
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
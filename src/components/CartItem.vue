<template>
    <div class="card mb-3 shadow-sm p-3">
      <div class="d-flex align-items-center">
        <!-- Gambar kiri -->
        <img
          :src="item.image || defaultImage"
          alt="Gambar Produk"
          class="me-3"
          style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"
        />
  
        <!-- Tengah: nama + toko + harga -->
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1 cursor-pointer" @click="goToDetail(item.id)">
            {{ item.name }}
          </h6>
          <p class="mb-1 text-muted">{{ item.store }}</p>
          <p class="mb-0">Rp{{ item.price.toLocaleString() }}</p>
        </div>
  
        <!-- Kanan: qty + hapus -->
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex align-items-center mb-2">
            <button class="btn btn-sm btn-outline-secondary me-1" @click="decreaseQty">−</button>
            <span>{{ item.qty }}</span>
            <button class="btn btn-sm btn-outline-secondary ms-1" @click="increaseQty">+</button>
          </div>
          <button class="btn btn-sm btn-danger" @click="removeItem">Hapus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartItem',
    props: {
      item: Object
    },
    data() {
      return {
        defaultImage: 'https://via.placeholder.com/80x80?text=Image'
      };
    },
    methods: {
      goToDetail(id) {
        this.$router.push(`/product/${id}`);
      },
      increaseQty() {
        this.$emit('update-qty', this.item.id, this.item.qty + 1);
      },
      decreaseQty() {
        if (this.item.qty > 1) {
          this.$emit('update-qty', this.item.id, this.item.qty - 1);
        }
      },
      removeItem() {
        this.$emit('remove-item', this.item.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
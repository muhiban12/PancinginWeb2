<template>
    <section class="container pt-5 my-4">
      <h4 class="fw-bold mb-4 border-bottom pb-2">🛒 Keranjang Belanja Kamu</h4>
  
      <div v-if="cartItems.length === 0" class="text-muted">Keranjang kamu kosong.</div>
  
      <div v-else>
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @update-qty="updateQty"
          @remove-item="removeItem"
        />
      </div>
    </section>
  
    <div class="card shadow-sm p-3 mt-4 container">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-0">Total Harga</h6>
          <p class="fw-bold text-success fs-5">Rp{{ totalPrice.toLocaleString() }}</p>
        </div>
        <button class="btn btn-success btn-lg" @click="goToCheckout">
          Bayar Sekarang
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import CartItem from '@/components/CartItem.vue';
  
  export default {
    name: 'Cart',
    components: { CartItem },
    data() {
      return {
        cartItems: [
          {
            id: 1,
            name: 'Dazelite Black Keycaps',
            store: 'Gooddealstock',
            price: 56000,
            qty: 1,
            image: 'https://via.placeholder.com/80x80?text=Dazelite'
          },
          {
            id: 2,
            name: 'FLYFIRE South-facing Keycaps',
            store: 'FLYFIRE Official Store',
            price: 298000,
            qty: 1,
            image: 'https://via.placeholder.com/80x80?text=FLYFIRE'
          },
          {
            id: 3,
            name: 'Polar Day Gradient Keycaps',
            store: 'KeebsMark',
            price: 169000,
            qty: 2,
            image: 'https://via.placeholder.com/80x80?text=Polar+Day'
          },
          {
            id: 4,
            name: 'Akko Neon Keycaps Set',
            store: 'Akko Official',
            price: 245000,
            qty: 1,
            image: 'https://via.placeholder.com/80x80?text=Akko+Neon'
          },
          {
            id: 5,
            name: 'Gateron Yellow Switches (Pack of 10)',
            store: 'SwitchLab',
            price: 85000,
            qty: 3,
            image: 'https://via.placeholder.com/80x80?text=Gateron+Yellow'
          }
        ]
      };
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      }
    },
    methods: {
      updateQty(id, newQty) {
        const item = this.cartItems.find(i => i.id === id);
        if (item) item.qty = newQty;
      },
      removeItem(id) {
        this.cartItems = this.cartItems.filter(i => i.id !== id);
      },
      goToCheckout() {
        this.$router.push({
          name: 'checkout',
          state: { items: this.cartItems }
        });
      }
    }
  };
  </script>
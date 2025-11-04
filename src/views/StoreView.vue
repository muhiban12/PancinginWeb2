<template>
    <div class="page">
      <h1>Toko Peralatan Memancing 🛒</h1>
  
      <div class="item">
        <h3>Joran Carbon</h3>
        <p>Harga: Rp 350.000</p>
        <button>Beli</button>
      </div>
  
      <div class="item">
        <h3>Kail Premium</h3>
        <p>Harga: Rp 25.000</p>
        <button>Beli</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StoreView"
  }
  </script>
  
  <style scoped>
  .page { padding: 20px; }
  .item {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 12px;
    border-radius: 6px;
  }
  button {
    margin-top: 5px;
  }
  </style>
  
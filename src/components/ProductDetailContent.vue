<template>
    <div class="product-wrapper" v-if="product">
  
      <!-- Back -->
      <button class="btn back-btn" @click="$emit('back')">
        <i class="bi bi-arrow-left"></i> Kembali
      </button>
  
      <!-- Grid Layout -->
      <div class="product-grid">
  
        <!-- LEFT — gambar -->
        <div class="left-col">
          <img :src="selectedImage" class="main-img"/>
          <div class="thumb-row">
            <img
              v-for="(img, index) in product.images"
              :key="index"
              :src="img"
              class="thumb-img"
              @click="selectedImage = img"
            />
          </div>
        </div>
  
        <!-- MIDDLE — detail -->
        <div class="mid-col">
          <h2 class="product-title">{{ product.name }}</h2>
  
          <div class="rating-line">
            ⭐ {{ product.rating }} | {{ product.stock }} tersedia
          </div>
  
          <div class="price">Rp {{ product.price.toLocaleString() }}</div>
  
          <!-- VARIAN -->
          <div v-if="product.variants && product.variants.length" class="variant-box">
            <div v-for="variant in product.variants" :key="variant.name">
              <label class="fw-semibold">{{ variant.name }}:</label>
              <select class="form-select" v-model="selectedVariants[variant.name]">
                <option v-for="option in variant.options" :key="option">{{ option }}</option>
              </select>
            </div>
          </div>
  
          <!-- qty -->
          <div class="qty-section">
            <label>Jumlah</label>
            <input 
              type="number"
              class="form-control qty-input"
              :value="quantity"
              min="1"
              :max="product.stock"
              @input="$emit('update:quantity', Number($event.target.value))"
            />
          </div>
  
        </div>
  
        <!-- RIGHT — tombol aksi -->
        <div class="right-col">
          <button class="btn btn-primary w-100 act-buy" :disabled="product.stock === 0">Beli Sekarang</button>
          <button class="btn btn-outline-primary w-100 act-cart" :disabled="product.stock === 0">Tambah ke Keranjang</button>
        </div>
      </div>
  
      <!-- DESKRIPSI -->
      <div class="desc-box">
        <h4 class="fw-bold">Deskripsi Produk</h4>
        <p>{{ product.description }}</p>
      </div>
  
    </div>
  
    <div v-else class="text-center my-5">
      <div class="spinner-border"></div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,
      selectedImage: String,
      selectedVariants: Object,
      quantity: Number
    },
    emits: ["back","update:quantity"],
  };
  </script>
  
  <style scoped>
  /* Container — padding supaya tidak ketutup navbar */
  .product-wrapper {
    padding-top: 90px;
    max-width: 1200px;
    margin: auto;
  }
  
  /* Back Button */
  .back-btn {
    background: #fff;
    border: 1px solid #bcd9ff;
    margin-bottom: 15px;
  }
  
  /* GRID Tokopedia style */
  .product-grid {
    display: grid;
    grid-template-columns: 35% 45% 20%;
    gap: 20px;
  }
  
  /* Left */
  .main-img {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #d6e6ff;
  }
  .thumb-row {
    display: flex;
    gap: 6px;
    margin-top: 8px;
  }
  .thumb-img {
    width: 65px;
    height: 65px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .thumb-img:hover {
    border-color: #0d6efd;
  }
  
  /* Middle */
  .product-title {
    font-size: 24px;
    font-weight: 700;
  }
  .rating-line {
    font-size: 14px;
    background: #e9f2ff;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .price {
    font-size: 28px;
    font-weight: 700;
    color: #0d6efd;
    margin-bottom: 16px;
  }
  .variant-box select {
    margin-bottom: 10px;
  }
  .qty-section {
    margin-top: 10px;
  }
  .qty-input {
    width: 80px;
  }
  
  /* Right buttons */
  .act-buy {
    background: #006eff;
    border: none;
    padding: 12px;
    font-weight: 600;
  }
  .act-cart {
    margin-top: 8px;
    padding: 12px;
    font-weight: 600;
  }
  
  /* Description */
  .desc-box {
    margin-top: 40px;
  }
  
  /* Responsive */
  @media (max-width: 991px){
    .product-grid {
      grid-template-columns: 1fr;
    }
    .right-col {
      display: flex;
      gap: 10px;
    }
  }
  </style>
  
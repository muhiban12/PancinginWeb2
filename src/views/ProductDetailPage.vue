<template>
    <div class="product-page">
      <!-- Breadcrumb -->
      <div class="breadcrumb">Beranda / Produk / Detail Produk</div>
  
      <!-- Product Layout -->
      <div class="container product-layout">
        
        <!-- Left: Images -->
        <div class="product-images">
          <img :src="product.image" class="main-image" />
          <div class="thumbs">
            <img
              v-for="img in product.thumbnailList"
              :key="img"
              :src="img"
              class="thumb"
              @click="changeMainImage(img)"
            />
          </div>
        </div>
  
        <!-- Center: Product Info -->
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
  
          <div class="rating-row">
            ⭐ {{ product.rating }} ({{ product.reviewCount }} ulasan)
          </div>
  
          <div class="product-price">Rp {{ formatPrice(product.price) }}</div>
  
          <div class="stock-info">Stok: {{ product.stock }}</div>
  
          <div class="quantity-block">
            <label>Jumlah</label>
            <input type="number" v-model="quantity" min="1" :max="product.stock" />
          </div>
        </div>
  
        <!-- Right: Action -->
        <div class="product-action">
          <button class="btn-buy" :disabled="product.stock === 0">
            Beli Sekarang
          </button>
          <button class="btn-cart" :disabled="product.stock === 0">
            + Keranjang
          </button>
        </div>
      </div>
  
      <!-- Deskripsi -->
      <div class="container product-desc">
        <h3>Deskripsi Produk</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["product"],
    data() {
      return {
        quantity: 1
      };
    },
    methods: {
      formatPrice(value) {
        return new Intl.NumberFormat("id-ID").format(value);
      },
      changeMainImage(url) {
        this.product.image = url;  
      }
    }
  };
  </script>
  
  <style scoped>
  .product-page {
    padding-top: 90px;
    background: #f7faff;
  }
  
  .container {
    width: 92%;
    margin: auto;
  }
  
  .breadcrumb {
    font-size: 14px;
    margin-bottom: 15px;
    color: #6d7d9c;
  }
  
  .product-layout {
    display: grid;
    grid-template-columns: 35% 45% 20%;
    gap: 24px;
  }
  
  /* Images */
  .main-image {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    background: white;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  }
  
  .thumbs {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
  
  .thumb {
    width: 62px;
    height: 62px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: .2s;
  }
  .thumb:hover {
    border: 2px solid #3490ff;
  }
  
  /* Info */
  .product-title {
    font-size: 22px;
    font-weight: 600;
  }
  .rating-row {
    margin: 5px 0;
    font-size: 16px;
  }
  .product-price {
    font-size: 26px;
    font-weight: bold;
    margin: 12px 0;
    color: #2175f5;
  }
  .stock-info {
    margin-bottom: 8px;
    color: #485d8c;
  }
  .quantity-block input {
    width: 80px;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid #cbd6f3;
  }
  
  /* Action Card */
  .product-action {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .btn-buy {
    background: #2175f5;
    border: none;
    border-radius: 8px;
    padding: 14px;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-buy:disabled {
    background: #8bb6ff;
    cursor: default;
  }
  .btn-cart {
    background: white;
    border: 2px solid #2175f5;
    color: #2175f5;
    padding: 14px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-cart:disabled {
    border-color: #8bb6ff;
    color: #8bb6ff;
  }
  
  /* Deskripsi */
  .product-desc {
    margin-top: 40px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  </style>
  
<template>
  <div ref="productWrapper" class="product-section">

    <!-- Header -->
    <div class="header-row">
      <h2>Rekomendasi Produk Pancing</h2>
    </div>

    <!-- Produk Grid -->
    <div class="product-grid">
      <div 
        class="product-card"
        v-for="(item, i) in paginatedProducts" 
        :key="i"
      >
        <img :src="item.image" alt="produk" />
        
        <div class="info">
          <p class="name">{{ item.name }}</p>
          <p class="price">Rp {{ formatPrice(item.price) }}</p>

          <div class="meta">
            <span class="rating">⭐ {{ item.rating }}</span>
            <span class="sold">{{ item.sold }} terjual</span>
          </div>

          <p class="city">{{ item.city }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="currentPage = page"
        :class="{ activePage: page === currentPage }"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductGrid",

  data() {
    return {
      currentPage: 1,
      perPage: 30, // 5 baris × 4 kolom
      products: [
        { name: "Joran Carbon 3m", price: 225000, rating: 4.8, sold: 320, city: "Bandung", image: "https://picsum.photos/200?fish1" },
        { name: "Reel Shimano Sienna 2500", price: 899000, rating: 4.9, sold: 540, city: "Jakarta", image: "https://picsum.photos/200?fish2" },
        { name: "Senar PE Braided 150m", price: 65000, rating: 4.7, sold: 780, city: "Surabaya", image: "https://picsum.photos/200?fish3" },
        { name: "Umpan Pelet Harian", price: 30000, rating: 4.8, sold: 900, city: "Bekasi", image: "https://picsum.photos/200?fish4" },
        { name: "Kail Mustad Size 6", price: 15000, rating: 4.6, sold: 1200, city: "Tangerang", image: "https://picsum.photos/200?fish5" },
        { name: "Tas Pancing Waterproof", price: 180000, rating: 4.7, sold: 410, city: "Depok", image: "https://picsum.photos/200?fish6" },
        { name: "Stick Umpan Wangi", price: 20000, rating: 4.5, sold: 600, city: "Bogor", image: "https://picsum.photos/200?fish7" },
        { name: "Emblem Strike Mania", price: 10000, rating: 4.9, sold: 120, city: "Bandung", image: "https://picsum.photos/200?fish8" },
        // Duplicate for many data (dummy)
        ...Array(40).fill().map((_, i) => ({
          name: `Pancing Set ${i+1}`,
          price: 120000 + i * 3000,
          rating: (4.5 + (i % 5) * .1).toFixed(1),
          sold: 100 + i * 10,
          city: "Jakarta",
          image: `https://picsum.photos/200?fish${i+9}`
        }))
      ]
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
    paginatedProducts() {
      let start = (this.currentPage - 1) * this.perPage;
      return this.products.slice(start, start + this.perPage);
    }
  },

  methods: {
    formatPrice(num) {
      return num.toLocaleString("id-ID");
    }
  }
};
</script>

<style scoped>
.product-section {
  width: 92%;
  margin: 50px auto;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.header-row h2 {
  font-size: 1.3rem;
  font-weight: 600;
}

.see-all {
  background: #e3efff;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  color: #0f4eb3;
  font-weight: 500;
  transition: 0.2s;
}
.see-all:hover { background: #c9deff; }

/* Grid */
.product-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

@media (max-width: 1200px) {
  .product-grid { grid-template-columns: repeat(5, 1fr); }
}

@media (max-width: 992px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 576px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: 0.25s;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
}

.product-card img {
  width: 100%;
  height: 140px; /* lebih proporsional */
  object-fit: cover;
}

.info { padding: 10px; }
.name {
  font-weight: 500;
  font-size: .88rem;
  min-height: 36px;
}
.price {
  color: #0064d2;
  font-weight: 700;
  margin: 4px 0;
}
.meta {
  font-size: .78rem;
  color: #777;
}
.city {
  font-size: .78rem;
  color: #555;
}

/* Pagination */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  color: #0f4eb3;
  border-radius: 6px;
  cursor: pointer;
  font-size: .85rem;
}

.pagination button.activePage {
  background: #0f4eb3;
  color: white;
  font-weight: 600;
}



</style>

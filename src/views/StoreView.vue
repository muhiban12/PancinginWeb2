<template>
  <div class="store-page">
    <!-- Navbar -->
    <Navbar />

    <!-- Konten Produk -->
    <div class="container store-content">
      <h2 class="text-center fw-bold mb-4">🛍️ Produk Pilihan</h2>

      <!-- Grid Produk -->
      <ProductGrid :products="products" :showPagination="true" />
      <!-- <div class="row g-4">
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
        >
          <div class="card h-100 shadow-sm product-card">
            <img :src="product.image" class="card-img-top" :alt="product.name" />
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">{{ product.name }}</h6>
              <p class="text-muted mb-1">Rp {{ formatPrice(product.price) }}</p>
              <p class="small text-secondary">⭐ {{ product.rating }} ({{ product.reviews }} ulasan)</p>
              <p class="small text-secondary">{{ product.location }}</p>
              <router-link :to="`/product/${product.id}`" class="btn btn-sm btn-primary mt-auto">Detail</router-link>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Pagination -->
      <nav class="mt-5">
        <ul class="pagination justify-content-center">
          <!-- Tombol Previous -->
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
              ‹
            </button>
          </li>

          <!-- Angka halaman -->
          <li 
            v-for="page in visiblePages" 
            :key="page" 
            class="page-item" 
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>

          <!-- Tombol Next -->
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
              ›
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProductGrid from '@/components/ProductGrid.vue';

export default {
  name: "StoreView",
  components: { Navbar, Footer, ProductGrid },
  data() {
    return {
      products: [],
      currentPage: 1,
      perPage: 50, // 5 produk x 10 baris
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.products.slice(start, start + this.perPage);
    },
    totalPages() {
    return Math.ceil(this.products.length / this.perPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.products.slice(start, start + this.perPage);
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5; // tampilkan maksimal 5 angka
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      // kalau di akhir, geser supaya tetap 5 angka
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("id-ID").format(value);
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    // Dummy data 150 produk
    this.products = Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      name: `Produk ${i + 1}`,
      image: `https://picsum.photos/300/200?random=${i}`,
      price: (i + 1) * 10000,
      rating: (Math.random() * 5).toFixed(1),
      reviews: Math.floor(Math.random() * 1000),
      location: "Jakarta Utara",
    }));
  },
};
</script>

<style scoped>
.store-content {
  margin-top: 100px; /* Sesuaikan dengan tinggi navbar kamu */
}

.product-card img {
  height: 160px;
  object-fit: cover;
}
.page-item.active .page-link {
  background-color: #2175f5;
  border-color: #2175f5;
  color: white;
}
</style>
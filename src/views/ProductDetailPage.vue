<template>
  <div class="product-page">
    <!-- Breadcrumb -->
    <div class="container">
      <div class="breadcrumb">Beranda / Produk / Detail Produk</div>
    </div>

    <!-- Konten Detail Produk -->
    <div class="container">
      <ProductDetailContent 
        :product="product" 
        :selectedImage="product.images[0]" 
      />
    </div>
  </div>
</template>

<script>
import ProductDetailContent from '@/components/ProductDetailContent.vue';

export default {
  name: "ProductDetailPage",
  components: { ProductDetailContent },
  data() {
    return {
      product: {
        id: 1,
        name: "Reel Pancing Premium",
        price: 150000,
        rating: 4.5,
        reviewCount: 1200,
        stock: 20,
        description: "Reel pancing berkualitas tinggi, ringan, dan tahan karat.",
        images: [
          "https://picsum.photos/400/300?1",
          "https://picsum.photos/400/300?2",
          "https://picsum.photos/400/300?3"
        ],
        types: [
          { name: "Standard", images: ["https://picsum.photos/400/300?4"] },
          { name: "Premium", images: ["https://picsum.photos/400/300?5"] }
        ]
      }
    };
  }
};
</script>

<style scoped>
.product-page {
  padding-top: 120px; /* jarak dari navbar fixed */
  background: #f7faff;
}

.breadcrumb {
  font-size: 14px;
  margin-bottom: 20px;
  color: #6d7d9c;
}
</style>
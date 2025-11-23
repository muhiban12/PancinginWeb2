<template>
  <div>
    <template v-if="product">
      <!-- Detail Produk -->
      <ProductDetailContent
        :product="product"
        :selectedImage="selectedImage"
        :selectedVariants="selectedVariants"
        :quantity="quantity"
        @update:quantity="quantity = $event"
        @update:variants="selectedVariants = $event"
        @update:selectedImage="selectedImage = $event"
        @back="goBack"
      />

      <!-- Ulasan -->
      <div class="review-section container my-5">
        <h3 class="fw-bold mb-4">Ulasan</h3>
        <ReviewStats :ratings="ratingCount" :total="reviews.length" :average="averageRating" />
        <FilterUlasan :selected="filter" @update:filter="filter = $event" />
        <ReviewList :reviews="reviews" :filter="filter" />
      </div>
    </template>

    <template v-else>
      <div class="text-center my-5"> 
        <div class="spinner-border"></div>
        <p>Loading...</p>
      </div>
    </template>
  </div>
</template>

<script>
import ProductDetailContent from '../components/ProductDetailContent.vue'
import ReviewStats from '../components/StatsUlasan.vue'
import FilterUlasan from '../components/FilterUlasan.vue'
import ReviewList from '../components/BoxUlasan.vue'

export default {
  components: {
    ProductDetailContent,
    ReviewStats,
    FilterUlasan,
    ReviewList,
  },
  data() {
    return {
      product: null,
      selectedImage: '',
      quantity: 1,
      selectedVariants: {},
      filter: 0,
      reviews: [
        {
          id: 1,
          name: 'Alan',
          avatar: 'https://i.pravatar.cc/32?u=1',
          rating: 5,
          comment: 'Mantap!',
        },
        {
          id: 2,
          name: 'Budi',
          avatar: 'https://i.pravatar.cc/32?u=2',
          rating: 4,
          comment: 'Bagus tapi bisa lebih oke',
        },
        {
          id: 3,
          name: 'Citra',
          avatar: 'https://i.pravatar.cc/32?u=3',
          rating: 5,
          comment: 'Sangat puas!',
        },
      ],
    }
  },
  computed: {
    ratingCount() {
      return {
        5: this.reviews.filter((r) => r.rating === 5).length,
        4: this.reviews.filter((r) => r.rating === 4).length,
        3: this.reviews.filter((r) => r.rating === 3).length,
        2: this.reviews.filter((r) => r.rating === 2).length,
        1: this.reviews.filter((r) => r.rating === 1).length,
      }
    },
    averageRating() {
      return (this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length).toFixed(1)
    },
  },
  mounted() {
    const id = Number(this.$route.params.id)
    const products = [
      {
        id: 1,
        name: 'Reel Pancing Premium',
        images: ['https://picsum.photos/500/400?1', 'https://picsum.photos/500/400?4'],
        price: 150000,
        stock: 10,
        rating: 4.5,
        description: 'Reel pancing premium',
        variants: [{ name: 'Warna', options: ['Hitam', 'Merah', 'Biru'] }],
        types: [
          {
            name: 'Baja Hitam',
            images: ['https://picsum.photos/500/400?1'],
          },
          {
            name: 'Stainless',
            images: ['https://picsum.photos/500/400?4'],
          },
        ],
      },
      {
        id: 2,
        name: 'Kail Pancing Super',
        images: ['https://picsum.photos/500/400?2'],
        price: 50000,
        stock: 20,
        rating: 4.0,
        description: 'Kail berkualitas tinggi',
        variants: [],
      },
      {
        id: 3,
        name: 'Umpan Ikan Segar',
        images: ['https://picsum.photos/500/400?3'],
        price: 25000,
        stock: 15,
        rating: 4.2,
        description: 'Umpan ikan segar',
        variants: [],
      },
    ]

    this.product = products.find((p) => p.id === id)
    if (!this.product) this.$router.push('/')

    this.selectedImage = this.product.images[0]
    this.product.variants?.forEach((v) => {
      this.selectedVariants[v.name] = v.options[0]
    })
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.back() : this.$router.push('/')
    },
  },
}
</script>

<style scoped>
@media (max-width: 768px) {
  .review-section {
    padding: 20px;
  }

  .review-section h3 {
    font-size: 20px;
  }
}
.review-section {
  background-color: #e9f7ff;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #cce6ff;
}
</style>

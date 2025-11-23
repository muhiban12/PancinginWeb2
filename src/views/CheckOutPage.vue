<template>
  <div class="checkout-wrapper container my-4">
    <div class="row">
      <!-- Kolom Kiri -->
      <div class="col-lg-8 col-md-12 mb-4">
        <div class="box-section mb-4">
          <AddressBox />
        </div>
        <div class="box-section">
          <ProductBox />
        </div>
      </div>

      <!-- Kolom Kanan -->
      <div class="col-lg-4 col-md-12">
        <div class="sticky-wrapper sticky-top"> 
          <div class="box-section">
            <PaymentBox />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressBox from '@/components/BoxAlamat.vue'
import ProductBox from '@/components/BoxProduct.vue'
import PaymentBox from '@/components/PaymentBox.vue'
</script>

<style scoped>
body {
  background-color: #a8d4f7;
}

.checkout-wrapper {
  padding-top: 20px;
  padding-bottom: 40px;
}

/* Box styling */
.box-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.sticky-wrapper {
  height: fit-content;
}

/* Sticky payment box on desktop */
@media (min-width: 992px) {
  .sticky-top {
    position: sticky;
    top: 70px;
    z-index: 10;
  }
}
</style>

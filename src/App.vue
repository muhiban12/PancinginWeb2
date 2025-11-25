<template>
  <div id="app">
    <Navbar />
    <main class="page-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Bagian konten utama */
.page-content {
  flex: 1; /* biar isi halaman fleksibel */
  padding: 80px 20px 100px; /* jarak atas (navbar) & bawah (footer) */
  max-width: 960px;
  margin: 0 auto; /* center konten */
  box-sizing: border-box;
}

/* Responsive untuk layar kecil */
@media (max-width: 480px) {
  .page-content {
    padding: 70px 15px 80px;
  }
}
</style>
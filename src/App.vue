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
  components: { Navbar, Footer }
};
</script>

<style>
body {
  padding-top: 50px;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
  padding: 0;
  width: 100%;
  max-width: none;
}

</style>
<template>
  <nav :class="['main-nav', { scrolled: isScrolled || !isHomepage }]">
    <div v-if="!showFullSearch" class="nav-left">
      <router-link to="/" class="logo">🎣 Pancingin</router-link>
    </div>

    <div v-if="showFullSearch" class="full-search">
      <input
        v-model="searchQuery"
        :placeholder="searchPlaceholder"
        @keyup.enter="goSearch"
        autofocus 
      />
      <button @click="goSearch">Cari</button>
      <span class="close-btn" @click="showFullSearch = false">✖</span>
    </div>

    <div v-if="!showFullSearch" class="nav-right">
      <template v-if="!isMobileLike">
        <i v-if="showSearchIcon" class="bi bi-search nav-icon" @click="showFullSearch = true"></i>
        <router-link to="/store" class="nav-icon"><i class="bi bi-shop"></i></router-link>
        <i class="bi bi-bell nav-icon" @click="showNotif = true"></i>
        <router-link to="/cart" class="nav-icon"><i class="bi bi-cart"></i></router-link>
        <router-link :to="profileLink" class="profile-wrapper">
          <img src="https://i.pravatar.cc/100" class="profile-pic" />
        </router-link>
      </template>

      <template v-if="isMobileLike">
        <i v-if="isScrolled" class="bi bi-search nav-icon" @click="showFullSearch = true"></i>
        <i class="bi bi-list nav-icon" @click="showMobileMenu = !showMobileMenu"></i>
        <div v-if="showMobileMenu" class="mobile-menu position-absolute bg-white p-2 shadow rounded">
          <router-link to="/store" class="d-block mb-2"><i class="bi bi-shop"></i> Store</router-link>
          <span class="d-block mb-2 nav-icon" @click="showNotif = true"><i class="bi bi-bell"></i> Notifications</span>
          <router-link to="/cart" class="d-block mb-2"><i class="bi bi-cart"></i> Cart</router-link>
          <router-link :to="profileLink" class="d-block">
            <i class="bi bi-person-circle"></i> Profile
          </router-link>
        </div>
      </template>
    </div>

    <NotificationModal :visible="showNotif" @close="showNotif = false" />
  </nav>
</template>

<script>
import NotificationModal from './NotificationModal.vue'

export default {
  components: { NotificationModal },
  data() {
    return {
      isScrolled: false,
      searchQuery: "",
      showFullSearch: false,
      showMobileMenu: false,
      showNotif: false
    };
  },
  computed: {
    isMobileLike() {
      return window.innerWidth < 768;
    },
    isHomepage() {
      return this.$route.path === '/';
    },
    showSearchIcon() {
      return !this.isHomepage || this.isScrolled;
    },
    searchPlaceholder() {
      if (this.$route.path.startsWith('/store')) return 'Cari produk...';
      if (this.$route.path.startsWith('/spots')) return 'Cari pemancingan terdekat...';
      return 'Cari...';
    },
    profileLink() {
      const isLoggedIn = !!localStorage.getItem('token');
      return isLoggedIn ? '/profile' : '/login';
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", () => this.$forceUpdate());
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 400;
    },
    goSearch() {
      if (!this.searchQuery.trim()) return;
      this.$router.push({ path: "/spots", query: { q: this.searchQuery } });
      this.showFullSearch = false;
    }
  }
};
</script>

<style scoped>
.main-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 40px;
  transition: 0.3s ease;
  /* backdrop-filter: blur(2px); */
}

/* Navbar transparan saat di atas hero */
.main-nav:not(.scrolled) {
  background: transparent;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
}

/* Navbar solid saat scroll */
.main-nav.scrolled {
  background: linear-gradient(90deg, #0083ff, #004aad);
  color: white;
  padding: 10px 40px;
}

/* Logo */
.logo {
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

/* Icon nav kanan */
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-icon {
  font-size: 18px;
  color: inherit;
  cursor: pointer;
  transition: 0.2s ease;
}

.bi-search {
  font-size: 18px;
}

.nav-icon:hover {
  color: #ffdd57;
}

.nav-right .bi-search {
  cursor: pointer;
  color: inherit;
  transition: 0.2s ease;
}

.nav-right .bi-search:hover {
  color: #ffdd57;
}

/* Profile image */
.profile-wrapper {
  display: flex;
  align-items: center;
}

.profile-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid white;
  transition: 0.2s;
}

.profile-pic:hover {
  transform: scale(1.05);
  border-color: #ffdd57;
}

/* Search mini bar saat scroll */
.mini-search {
  display: flex;
  background: white;
  padding: 5px 10px;
  border-radius: 20px;
  width: 280px;
  border: 2px solid #e5e5e5;
  margin: 0 10px;
}

.mini-search input {
  font-size: 14px;
}

.mini-search button {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.search-icon-btn {
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
}

.full-search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(90deg, #0083ff, #004aad);
  z-index: 2000;
}

.full-search input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.full-search button {
  padding: 10px 16px;
  border-radius: 8px;
  background: #ffdd57;
  border: none;
  font-weight: bold;
}

.close-btn {
  font-size: 22px;
  cursor: pointer;
  padding: 4px 10px;
}

.mobile-menu {
  top: 60px; /* sesuaikan dengan tinggi navbar */
  right: 10px;
  min-width: 150px;
  z-index: 1001;
}

.mobile-menu a {
  color: #222;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
  transition: 0.2s;
}

.mobile-menu a:hover {
  background-color: #f0f0f0;
}

.nav-right .bi-list,
.nav-right .bi-search {
  font-size: 1.6rem;
  cursor: pointer;
  color: white;
  margin-left: 12px;
}

</style>

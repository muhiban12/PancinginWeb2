import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import FishingSpotView from '../views/FishingSpotView.vue'
import StoreView from '../views/StoreView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetail from '../views/ProductDetail.vue' 
import FishingSpotDetail from '@/views/FishingSpotDetail.vue'
import BayarView from '@/views/BayarView.vue'
import DiprosesView from '@/views/DiprosesView.vue'
import DikirimView from '@/views/DikirimView.vue'
import TibaView from '@/views/TibaView.vue'
import UlasanView from '@/views/UlasanView.vue' 

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/spots', name: 'spots', component: FishingSpotView },
  { path: '/booking', name: 'booking', component: BookingView },
  { path: '/store', name: 'store', component: StoreView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail},
  { path: '/spot/:id', name: 'spot-detail', component : FishingSpotDetail},
  { path: '/notifications', component: () => import('@/views/NotificationsView.vue') },
  { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue') },
  { path: '/account', component: () => import('@/views/ProfileView.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('@/views/CheckOutPage.vue') },
  { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },

  // Tambahan untuk transaksi
  { path: '/bayar', name: 'bayar', component: BayarView },
  { path: '/diproses', name: 'diproses', component: DiprosesView },
  { path: '/dikirim', name: 'dikirim', component: DikirimView },
  { path: '/tiba', name: 'tiba', component: TibaView },
  { path: '/ulasan', name: 'ulasan', component: UlasanView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // atau cek Vuex/Pinia

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;


// Tambahkan Bootstrap Icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
document.head.appendChild(link);




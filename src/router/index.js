import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import FishingSpotView from '../views/FishingSpotView.vue'
import StoreView from '../views/StoreView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductDetail from '../views/ProductDetail.vue' 
import FishingSpotDetail from '@/views/FishingSpotDetail.vue'

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
  { path: '/cart', component: () => import('@/views/CartView.vue') },
  { path: '/account', component: () => import('@/views/AccountView.vue') },
  { path: '/checkout', name: 'checkout', component: () => import('@/views/CheckOutPage.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});

export default router;


// Tambahkan Bootstrap Icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
document.head.appendChild(link);




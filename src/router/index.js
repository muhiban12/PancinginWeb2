import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import FishingSpotView from '../views/FishingSpotView.vue'
import StoreView from '../views/StoreView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/spots',
    name: 'spots',
    component: FishingSpotView
  },
  {
    path: '/booking',
    name: 'booking',
    component: BookingView
  },
  {
    path: '/store',
    name: 'store',
    component: StoreView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
],
})

export default router

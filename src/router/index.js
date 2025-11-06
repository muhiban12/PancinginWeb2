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
  },
  {
    path: "/store",
    component: () => import("@/views/StoreView.vue")
  },
  {
    path: "/notifications",
    component: () => import("@/views/NotificationsView.vue")
  },
  {
    path: "/cart",
    component: () => import("@/views/CartView.vue")
  },
  {
    path: "/account",
    component: () => import("@/views/AccountView.vue")
  }
  
],
})

export default router

// Tambahkan Bootstrap Icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";
document.head.appendChild(link);

// Membuat footer
const footer = document.createElement("footer");
footer.className = "footer py-4 text-white";
footer.style.background = "linear-gradient(90deg, #0083ff, #004aad)";

// Kontainer
const container = document.createElement("div");
container.className = "container d-flex flex-column flex-md-row justify-content-between align-items-center";

// Nama website
const left = document.createElement("div");
left.className = "footer-left fw-bold mb-3 mb-md-0 fs-5";
left.textContent = "🎣 Pancingin";

// Sosial media
const right = document.createElement("div");
right.className = "footer-right d-flex gap-3";

const socialLinks = [
  { href: "https://instagram.com", icon: "bi-instagram" },
  { href: "https://facebook.com", icon: "bi-facebook" },
  { href: "https://twitter.com", icon: "bi-twitter" },
  { href: "mailto:email@example.com", icon: "bi-envelope-fill" },
];

socialLinks.forEach(s => {
  const a = document.createElement("a");
  a.href = s.href;
  a.target = "_blank";
  a.className = "text-white";
  a.innerHTML = `<i class="bi ${s.icon}" style="font-size:1.4rem;"></i>`;
  a.style.transition = "all 0.2s ease-in-out";
  a.onmouseover = () => a.style.transform = "scale(1.1)";
  a.onmouseout = () => a.style.transform = "scale(1)";
  right.appendChild(a);
});

container.appendChild(left);
container.appendChild(right);
footer.appendChild(container);

// Masukkan footer ke body
document.body.appendChild(footer);


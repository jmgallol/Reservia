import { createRouter, createWebHistory } from 'vue-router';

import AdminView from '../views/AdminView.vue';
import AuthView from '../views/AuthView.vue';
import HomeView from '../views/HomeView.vue';
import ReservationView from '../views/ReservationView.vue';

import { AuthService } from '@/services/AuthService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Inicio' } },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: HomeView,
      meta: { title: 'Restaurantes' },
    },
    { path: '/about', name: 'about', component: HomeView, meta: { title: 'Acerca de' } },
    { path: '/auth', name: 'auth', component: AuthView, meta: { title: 'Autenticación' } },

    // Client routes (Protected)
    {
      path: '/my-reservations',
      name: 'my-reservations',
      component: ReservationView,
      meta: { title: 'Mis Reservas', requiresAuth: true, role: 'client' },
    },

    // Admin routes (Protected)
    {
      path: '/admin',
      redirect: '/admin/dashboard',
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminView,
      meta: { title: 'Dashboard', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/restaurant',
      name: 'admin-restaurant',
      component: AdminView,
      meta: { title: 'Mi Restaurante', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/reservations',
      name: 'admin-reservations',
      component: AdminView,
      meta: { title: 'Reservas', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/reviews',
      name: 'admin-reviews',
      component: AdminView,
      meta: { title: 'Reseñas', requiresAuth: true, role: 'admin' },
    },
  ],
});

// Navigation guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !AuthService.isAuthenticated()) {
    return { name: 'auth' };
  }
});

export default router;

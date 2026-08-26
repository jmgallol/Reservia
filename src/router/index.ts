import { createRouter, createWebHistory } from 'vue-router';

import AdminView from '../views/AdminView.vue';
import AuthView from '../views/AuthView.vue';
import HomeView from '../views/HomeView.vue';
import ReservationView from '../views/ReservationView.vue';

import { AuthService } from '@/services/AuthService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/inicio' },
    { path: '/inicio', name: 'inicio', component: HomeView, meta: { title: 'Inicio' } },
    {
      path: '/restaurantes',
      name: 'restaurantes',
      component: HomeView,
      meta: { title: 'Restaurantes' },
    },
    { path: '/acerca-de', name: 'acerca-de', component: HomeView, meta: { title: 'Acerca de' } },
    { path: '/auth', name: 'auth', component: AuthView, meta: { title: 'Autenticación' } },

    // Client routes (Protected)
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { title: 'Inicio', requiresAuth: true, role: 'client' },
    },
    {
      path: '/mis-reservas',
      name: 'mis-reservas',
      component: ReservationView,
      meta: { title: 'Mis Reservas', requiresAuth: true, role: 'client' },
    },

    // Admin routes (Protected)
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminView,
      meta: { title: 'Dashboard', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/restaurante',
      name: 'admin-restaurante',
      component: AdminView,
      meta: { title: 'Mi Restaurante', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/reservas',
      name: 'admin-reservas',
      component: AdminView,
      meta: { title: 'Reservas', requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/resenas',
      name: 'admin-resenas',
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

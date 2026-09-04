// External imports
import { createRouter, createWebHistory, type Router } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';
import AdminView from '@/views/AdminView.vue';
import AuthView from '@/views/AuthView.vue';
import HomeView from '@/views/HomeView.vue';
import ReservationView from '@/views/ReservationView.vue';
import RestaurantShowView from '@/views/RestaurantShowView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    {
      path: '/',
      redirect: '/restaurants',
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: HomeView,
      meta: { title: 'Restaurantes' },
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant-show',
      component: RestaurantShowView,
      meta: { title: 'Detalles del Restaurante' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { title: 'Autenticación', guestOnly: true },
    },

    // Client routes (Protected)
    {
      path: '/reservations',
      name: 'reservations',
      component: ReservationView,
      meta: { title: 'Mis Reservas', requiresAuth: true },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: HomeView,
      meta: { title: 'Mis Reseñas', requiresAuth: true },
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
      meta: { title: 'Dashboard', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/restaurant',
      name: 'admin-restaurant',
      component: AdminView,
      meta: { title: 'Mi Restaurante', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/reservations',
      name: 'admin-reservations',
      component: AdminView,
      meta: { title: 'Reservas', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/reviews',
      name: 'admin-reviews',
      component: AdminView,
      meta: { title: 'Reseñas', requiresAuth: true, requiresAdmin: true },
    },
  ],
});

export const configureRouterGuards = (router: Router): void => {
  router.beforeEach((to) => {
    const isAuth = AuthService.isAuthenticated();
    const currentUser = AuthService.getCurrentUser();

    if (to.meta.guestOnly && isAuth) {
      if (currentUser?.role === 'admin') {
        return { name: 'admin-dashboard' };
      }

      return { name: 'restaurants' };
    }

    if (to.meta.requiresAuth && !isAuth) {
      return { name: 'auth' };
    }

    if (to.meta.requiresAdmin && currentUser?.role !== 'admin') {
      return { name: 'restaurants' };
    }

    return true;
  });
};

configureRouterGuards(router);

export default router;

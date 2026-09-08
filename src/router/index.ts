// External imports
import { createRouter, createWebHistory, type Router } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';
import AdminReservationsView from '@/views/admin/AdminReservationsView.vue';
import AdminRestaurantView from '@/views/admin/AdminRestaurantView.vue';
import AdminReviewsView from '@/views/admin/AdminReviewsView.vue';
import AdminView from '@/views/admin/AdminView.vue';
import AuthView from '@/views/auth/AuthView.vue';
import HomeView from '@/views/client/HomeView.vue';
import MapView from '@/views/client/MapView.vue';
import ReservationView from '@/views/client/ReservationView.vue';
import RestaurantShowView from '@/views/client/RestaurantShowView.vue';
import ReviewView from '@/views/client/ReviewView.vue';

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
      meta: {
        title: 'Restaurantes',
        subtitle: 'Encuentra tu próxima experiencia gastronómica',
      },
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant-show',
      component: RestaurantShowView,
      meta: {
        title: 'Detalles del Restaurante',
        subtitle: 'Información y reservas',
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { title: 'Autenticación', guestOnly: true },
    },

    // Client routes
    {
      path: '/reservations',
      name: 'reservations',
      component: ReservationView,
      meta: {
        title: 'Mis Reservas',
        subtitle: 'Consulta y gestiona tus reservas confirmadas y pendientes',
        requiresAuth: true,
      },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: ReviewView,
      meta: {
        title: 'Mis Reseñas',
        subtitle: 'Opiniones y calificaciones que has compartido',
        requiresAuth: true,
      },
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      meta: {
        title: 'Mapa Gastronómico',
        subtitle: 'Explora restaurantes cercanos en tu ciudad',
        requiresAuth: true,
      },
    },

    // Admin routes
    {
      path: '/admin',
      redirect: '/admin/dashboard',
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminView,
      meta: {
        title: 'Dashboard',
        subtitle: 'Estadísticas del restaurante',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/admin/restaurant',
      name: 'admin-restaurant',
      component: AdminRestaurantView,
      meta: {
        title: 'Mi Restaurante',
        subtitle: 'Administra la información pública de tu establecimiento',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/admin/reservations',
      name: 'admin-reservations',
      component: AdminReservationsView,
      meta: {
        title: 'Reservas del Restaurante',
        subtitle: 'Control y confirmación de reservaciones',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/admin/reviews',
      name: 'admin-reviews',
      component: AdminReviewsView,
      meta: {
        title: 'Reseñas de Clientes',
        subtitle: 'Comentarios y valoraciones recibidas',
        requiresAuth: true,
        requiresAdmin: true,
      },
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

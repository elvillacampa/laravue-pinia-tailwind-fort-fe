import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'
import ServerError from '@/views/errors/500.vue'
import NotFound from '@/views/errors/404.vue'
import { AuthStore } from '@/store/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{ requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{ requiresAuth: false }

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => Dashboard,
      meta:{ requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta:{ requiresAuth: false }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/server-error',
      name: 'ServerError',
      component: ServerError,
    },
  ],
})

router.beforeEach((to, from, next) => {
  
  const {isloggedIn} = AuthStore(); 

  if (to.meta.requiresAuth && !isloggedIn) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isloggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});
export default router

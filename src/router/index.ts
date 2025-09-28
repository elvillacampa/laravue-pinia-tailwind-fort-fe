import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'
import ServerError from '@/views/errors/500.vue'
import NotFound from '@/views/errors/404.vue'
import { AuthStore } from '@/store/auth';
import PostIndex from '@/views/posts/PostIndex.vue'
import PostCreate from '@/views/posts/PostCreate.vue'
import PostView from '@/views/posts/PostView.vue'
import PostEdit from '@/views/posts/PostEdit.vue' 

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
    {
      path: '/dashboard/posts',
      name: 'PostIndex',
      component: PostIndex,
      meta:{ requiresAuth: true }
    },
    {
      path: '/dashboard/posts/create',
      name: 'PostCreate',
      component: PostCreate,
      meta:{ requiresAuth: true }
    },
    {
      path: '/dashboard/posts/view/:slug',
      name: 'PostView',
      component: PostView,
      meta:{ requiresAuth: true },
      props: true
    },
    {
      path: '/dashboard/posts/edit/:slug',
      name: 'PostEdit',
      component: PostEdit,
      meta:{ requiresAuth: true },
      props: true
    },
  ],
})

router.beforeEach((to, from, next) => {
  
  const {isLoggedIn} = AuthStore(); 

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    next('/dashboard');
  } else {
    next();
  }
});
export default router

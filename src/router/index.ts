import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/auth/Dashboard.vue'
import ServerError from '@/views/errors/500.vue'
import NotFound from '@/views/errors/404.vue'
import Unauthorized from '@/views/errors/403.vue'
import { AuthStore } from '@/store/auth';
// import PostIndex from '@/views/posts/PostIndex.vue'
import MainView from '@/views/MainView.vue'
import AdminIndex from '@/views/admin/AdminIndex.vue'
import PostAdd from '@/views/admin/posts/PostAdd.vue'
import PostList from '@/views/admin/posts/PostList.vue'
import PostView from '@/views/admin/posts/PostView.vue'
import PostEdit from '@/views/admin/posts/PostEdit.vue' 
import PostIndex from '@/views/admin/posts/PostIndex.vue'
import UserManagementIndex from '@/views/usermanagement/UserManagementIndex.vue'
import UserIndex from '@/views/usermanagement/users/UserIndex.vue'
import UserList from '@/views/usermanagement/users/UserList.vue'
import UserAdd from '@/views/usermanagement/users/UserAdd.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    breadcrumb?: string
    permissions?: string[] // 👈 allow permissions meta
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: MainView,
    children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta:{ requiresAuth: true, breadcrumb: 'Dashboard', permissions: []}
        },
        {
          name: 'PostIndex',
          path: '/post',
          redirect:'/post/list',
          component: PostIndex,
          meta:{ requiresAuth: true , breadcrumb: 'Posts',},
          children:[
            {
              name: 'Post',
              path: '/post/list',
              component: PostList,
              meta:{ requiresAuth: true , breadcrumb: 'List', permissions: ['access post']},
            },
            {
              name: 'PostAdd',
              path: '/post/add',
              component: PostAdd,
              meta:{ requiresAuth: true, breadcrumb: 'Add', permissions: ['add post']}
            },
            {
              name: 'PostView',
              path: '/post/view/:slug',
              component: PostView,
              meta:{ requiresAuth: true , breadcrumb: 'View', permissions: ['view post']},
              props: true
            },
            {
              name: 'PostEdit',
              path: '/post/edit/:slug',
              component: PostEdit,
              meta:{ requiresAuth: true, breadcrumb: 'Edit' , permissions: ['edit post']},
              props: true
            },
          ]
        },
        // {
        //   path: '/admin',
        //   name: 'Admin',
        //   redirect: '/admin/post',
        //   component: AdminIndex,
        //   meta:{ requiresAuth:  true },
        //   children:[
        //       {
        //         name: 'PostIndex',
        //         path: '/admin/post',
        //         redirect:'/admin/post/list',
        //         component: PostIndex,
        //         meta:{ requiresAuth: true , breadcrumb: 'Posts',},
        //         children:[
        //           {
        //             name: 'Post',
        //             path: '/admin/post/list',
        //             component: PostList,
        //             meta:{ requiresAuth: true , breadcrumb: 'List', permissions: ['access post']},
        //           },
        //           {
        //             name: 'PostAdd',
        //             path: '/admin/post/add',
        //             component: PostAdd,
        //             meta:{ requiresAuth: true, breadcrumb: 'Add', permissions: ['add post']}
        //           },
        //           {
        //             name: 'PostView',
        //             path: '/admin/post/view/:slug',
        //             component: PostView,
        //             meta:{ requiresAuth: true , breadcrumb: 'View', permissions: ['view post']},
        //             props: true
        //           },
        //           {
        //             name: 'PostEdit',
        //             path: '/admin/post/edit/:slug',
        //             component: PostEdit,
        //             meta:{ requiresAuth: true, breadcrumb: 'Edit' , permissions: ['edit post']},
        //             props: true
        //           },
        //         ]
        //       },
        //   ]
        // },
        {
          path: '/user-management',
          name: 'User Management',
          redirect: '/user-management/user',
          component: UserManagementIndex,
          meta:{ requiresAuth: true, breadcrumb: 'User Management' },
          children:[
              {
                name: 'UserIndex',
                path: 'user',
                component: UserIndex,
                meta:{ requiresAuth: true, breadcrumb: 'Users', permissions: ['access user'] },
                  children:[
                    {
                      name: 'User',
                      path: 'list',
                      component: UserList,
                      meta:{ requiresAuth: true , breadcrumb: 'List', permissions: ['access user']},
                    },
                    {
                      name: 'UserAdd',
                      path: 'add',
                      component: UserAdd,
                      meta:{ requiresAuth: true, breadcrumb: 'Add', permissions: ['add user']}
                    },
                  ]
              },
              {
                name: 'Role', 
                path: 'role',
                component: HomeView,
                meta:{ requiresAuth: true, breadcrumb: 'Roles', permissions: ['access role'] }
              },
              {
                name: 'Permission',
                path: 'permission',
                component: HomeView,
                meta:{ requiresAuth: true, breadcrumb: 'Permissions', permissions: ['access permission'] }
              },
              {
                name: 'Activity Log',
                path: 'activity-log',
                component: HomeView,
                meta:{ requiresAuth: true, breadcrumb: 'Activity Logs', permissions: ['access activity log']}
              }
          ]

        }
 
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta:{ requiresAuth: false, breadcrumb: 'Home', permissions: [] }
    },  
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{ requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{ requiresAuth: false }

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
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized,
    },
    {
      path: '/server-error',
      name: 'ServerError',
      component: ServerError,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundCatchAll',
      redirect: { name: 'NotFound' }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const {isLoggedIn, getUser} = AuthStore(); 

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login' });
  }
  
  if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    return next({ name: 'Dashboard' });
  } 
  const required = to.meta.permissions;
  const userPermissions = getUser?.permissions || [];
  
  if(required && !required.every(p => userPermissions.includes(p))) {
    return next({ name: 'Unauthorized' });
  }
  return next();
});
export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('accessToken');
//   if (to.path === '/login' && isAuthenticated) {
//     next('/');
//   } else if (to.path !== '/login' && !isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router

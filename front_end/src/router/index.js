import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import MainShop from '../views/Shop/MainShop.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/signup',
    name: Signup,
    component: Signup,
  },
  {
    path: '/login',
    name: Login,
    component: Login,
  },

  {
    path: '/',
    name: MainShop,
    component: MainShop,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next('/login');
    } else {
      next();
    }
    next();
  } else {
    if (!localStorage.getItem('token')) {
      next();
    } else {
      next('/');
    }
    next();
  }
});
export default router;

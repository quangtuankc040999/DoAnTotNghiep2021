import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import Products from '../views/Products/Products.vue';
import Home from '../views/Home.vue'
import Blog from '../views/Blog/Blog.vue'
import Contact from '../views/Contact/Contact.vue'
import { decodeToken } from '../utils/helper';
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
    path: '/products',
    name: Products,
    component: Products,
  },
  {
    path: '/blog',
    name: Blog,
    component: Blog,
  },
  {
    path: '/contact',
    name: Contact,
    component: Contact,
  },
  {
    path: '/',
    name: Home,
    component: Home,
    meta:{
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  let user = decodeToken();
  console.log(user)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    } else {
      next();
    }
    next();
  } else {
    if (!token) {
      next();
    } else {
      next('/');
    }
    next();
  }
});

export default router;

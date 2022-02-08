import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Register.vue';
import Products from '../views/Products/Products.vue';
import Home from '../views/Home.vue'
import Blog from '../views/Blog/Blog.vue'
import Contact from '../views/Contact/Contact.vue'
import Profile from '../views/Profile/Profile.vue'
import ProductDetail from '../views/Products/ProductDetail.vue'
import ListProduct from '../views/Products/ListProduct.vue'
import Cart from '../views/Products/Cart.vue'
import Payment from '../views/Products/Payment.vue'
import Admin from '../views/Admin/Admin.vue'
import manageProduct from '../views/Admin/ManageProduct.vue'
import manageOrder from '../views/Admin/ManageOrder.vue'
import manageUser from '../views/Admin/ManageUser.vue'
import manageOrderUser from '../views/User/ManageOrderUser.vue'
import ListOrder from '../views/User/ListOrder.vue'
import orderDetail from '../views/User/OrderDetail.vue'

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
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/products/product-detail/:id',
        name: ProductDetail,
        component: ProductDetail,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/products/:categoryName',
        name: ListProduct,
        component: ListProduct,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/products/:categoryName/:categoryDetail',
        name: ListProduct,
        component: ListProduct,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/products',
        name: ListProduct,
        component: ListProduct,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/cart',
    name: Cart,
    component: Cart,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payment',
    name: Payment,
    component: Payment,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/blog',
    name: Blog,
    component: Blog,
    meta: {
      requiresAuth: true
    }
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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: Profile,
    component: Profile,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/profile/user/manage-order/',
        name: manageOrderUser,
        component: manageOrderUser,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/profile/user/manage-order/:statusOrder',
            name: ListOrder,
            component: ListOrder,
            meta: {
              requiresAuth: true
            },
          },
        ]
      },
      {
        path: '/profile/user/manage-order/detail/:orderId',
        name: orderDetail,
        component: orderDetail,
        meta: {
          requiresAuth: true
        },
      }
    ]
  },
  {
    path: '/admin',
    name: Admin,
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/admin/manage-product/',
        name: manageProduct,
        component: manageProduct,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/manage-order/',
        name: manageOrder,
        component: manageOrder,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/manage-user/',
        name: manageUser,
        component: manageUser,
        meta: {
          requiresAuth: true
        }
      },
    ]
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

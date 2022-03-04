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
import ListProductByPrice from '../views/Products/ListProductByPrice.vue'
import ListProductByBrand from '../views/Products/ListProductByBrand.vue'
import ListProductByName from '../views/Products/ListProductByName.vue'
import Cart from '../views/Products/Cart.vue'
import Payment from '../views/Products/Payment.vue'
import Admin from '../views/Admin/Admin.vue'
import manageProduct from '../views/Admin/ManageProduct/ManageProduct.vue'
import manageStore from '../views/Admin/ManageStore/ManageStore.vue'
import manageOrder from '../views/Admin/ManageOrder.vue'
import manageUser from '../views/Admin/ManageUser.vue'
import manageOrderUser from '../views/User/ManageOrderUser.vue'
import ListOrder from '../views/User/ListOrder.vue'
import orderDetail from '../views/User/OrderDetail.vue'
import userInformation from '../views/Profile/UserInformation.vue'
import ChatPageAdmin from '../views/Admin/ChatAmin/ChatPageAdmin.vue'
import ChatRoomAdmin from '../components/Admin/ChatAdmin/ChatAdmin.vue'
import PlayView from '../views/PlayRubik/PlayView.vue'
// import ImportGoods from '../components/Admin/ManageStore/ImportGoods.vue'
// import ViewLog from '../components/Admin/ManageStore/ViewLog.vue'
import ForbbidenPage from '../views/403Page.vue'
import SinglePlay from '../components/PlayRubik/Single-play.vue'
import CreatePostBlogs from '../views/Blog/CreatePost.vue'
import BlogHome from '../views/Blog/BlogHome.vue'
// import BlogPreview from '../views/Blog/BlogPreview'
import BlogDetail from '../views/Blog/BlogDetail'
import { decodeToken } from '../utils/helper';
Vue.use(VueRouter);
const routes = [
  {
    path: "/403", component: ForbbidenPage, meta: {
      guest: true
    },
  },
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
      guest: true
    },
    children: [
      {
        path: '/filter/search/',
        name: ListProductByName,
        component: ListProductByName,
      },
      {
        path: '/filter/brand/',
        name: ListProductByBrand,
        component: ListProductByBrand,
      },
      {
        path: '/filter/price/',
        name: ListProductByPrice,
        component: ListProductByPrice,
      },
      {
        path: '/products/product-detail/:id',
        name: ProductDetail,
        component: ProductDetail,
      },
      {
        path: '/products/list/:categoryName',
        name: ListProduct,
        component: ListProduct,
      },
      {
        path: '/products/list-detail/:categoryName/:categoryDetail',
        name: ListProduct,
        component: ListProduct,
      },
      {
        path: '/products/all-product',
        name: ListProduct,
        component: ListProduct,
      },

    ]
  },
  {
    path: '/cart',
    name: Cart,
    component: Cart,
    meta: {
      requiresAuth: true,
      user_system: true
    }
  },
  {
    path: '/payment',
    name: Payment,
    component: Payment,
    meta: {
      requiresAuth: true,
      user_system: true
    }
  },

  {
    path: '/blog',
    name: BlogHome,
    component: BlogHome,
    meta: {
      guest: true,
    },
    children: [
      {
        path: '/blog/create-blog',
        name: CreatePostBlogs,
        component: CreatePostBlogs,
      },
    
      {
        path: '/blog/main-page',
        name: Blog,
        component: Blog,
      },
      {
        path: '/blog/detail/:blogId',
        name: BlogDetail,
        component: BlogDetail,
      },
    ]
  },
  {
    path: '/play-rubik',
    name: PlayView,
    component: PlayView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/play-rubik/single-player',
        name: SinglePlay,
        component: SinglePlay,
      },
    ]
  },
  {
    path: '/contact',
    name: Contact,
    component: Contact,
    meta: {
      guest: true
    },
  },
  {
    path: '/',
    name: Home,
    component: Home,
    meta: {
      guest: true
    },

  },
  {
    path: '/profile',
    name: Profile,
    component: Profile,
    meta: {
      requiresAuth: true,
      user_system: true
    },
    children: [
      {
        path: '/profile/user/manage-account/',
        name: userInformation,
        component: userInformation,
      },
      {
        path: '/profile/user/manage-order/',
        name: manageOrderUser,
        component: manageOrderUser,
        children: [
          {
            path: '/profile/user/manage-order/:statusOrder',
            name: ListOrder,
            component: ListOrder,
          },
        ]
      },
      {
        path: '/profile/user/manage-order/detail/:orderId',
        name: orderDetail,
        component: orderDetail,
      }
    ]
  },
  {
    path: '/admin',
    name: Admin,
    component: Admin,
    meta: {
      admin_system: true,
      requiresAuth: true
    },
    children: [
      {
        path: '/admin/manage-product/',
        name: manageProduct,
        component: manageProduct,
      },
      {
        path: '/admin/manage-order/',
        name: manageOrder,
        component: manageOrder,
      },
      {
        path: '/admin/manage-user/',
        name: manageUser,
        component: manageUser,
      },
      {
        path: '/admin/manage-chat/',
        name: ChatPageAdmin,
        component: ChatPageAdmin,
        children: [
          {
            path: '/admin/manage-chat/:idChatRoom',
            name: ChatRoomAdmin,
            component: ChatRoomAdmin,
          }]
      },
      {
        path: '/admin/manage-store/',
        name: manageStore,
        component: manageStore,
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    }
    if (to.matched.some((record) => record.meta.admin_system)) {
      if (user.role != 'Admin') {
        next('/403')
      }
    } else {
      next();
    }
    if (to.matched.some((record) => record.meta.user_system)) {
      if (user.role != 'User') {
        next('/')
      }
      if (user.role == 'Admin') {
        next('/admin')
      }
    } else {
      next();
    }
    next();
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!token) {
      next();
    } else {
      if (user.role == 'Admin') {
        next('/admin')
      }
      next()
    }
  }
  else {
    if (token === null) {
      next()
    }
    else {
      next({ path: '/' })
    }
  }
});

export default router;

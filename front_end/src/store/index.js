import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.js';
import Validation from './modules/validation';
import User from './modules/user';
import SideBar from './modules/sideBar'
import ErrorMessage from './modules/errorMessage';
import ListProduct from './modules/listProduct'
import Cart from './modules/cart'
import Payment from './modules/payment'
import ProductAction from './modules/admin/productAction'
import Ratting from './modules/ratting'
import Chat from './modules/chatRoom/chat'
import Room from './modules/chatRoom/room'
import Log from './modules/log'
import OrderAdmin from './modules/admin/orderAdmin'
import Blogs from './modules/blogs'
import CommentBlog from './modules/commentBlogs'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: Auth,
    USER: User,
    VALIDATION: Validation,
    ERROR: ErrorMessage,
    SIDEBAR: SideBar,
    PRODUCTS: ListProduct,
    CART: Cart,
    PAYMENT: Payment,
    PRODUCTACTION: ProductAction,
    RATTING: Ratting,
    CHAT: Chat,
    ROOM: Room,
    LOG: Log,
    ORDERADMIN: OrderAdmin,
    BLOGS: Blogs,
    COMMENTBLOG: CommentBlog
  },
});

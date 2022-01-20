import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.js';
import Validation from './modules/validation';
import User from './modules/user';
import SideBar from './modules/sideBar'
import ErrorMessage from './modules/errorMessage';
import ListProduct from './modules/listProduct'
import Cart from './modules/cart'

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
  },
});

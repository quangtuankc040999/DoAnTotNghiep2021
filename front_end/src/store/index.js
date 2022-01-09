import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth.js';
import Validation from './modules/validation';
import User from './modules/user';
import ErrorMessage from './modules/errorMessage';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: Auth,
    USER: User,
    VALIDATION: Validation,
    ERROR: ErrorMessage,
  },
});

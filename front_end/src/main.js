import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'
import VueJWT from 'vuejs-jwt'
import '@mdi/font/css/materialdesignicons.css';
import {BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue, IconsPlugin, BootstrapVueIcons)
Vue.use(VueJWT)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')

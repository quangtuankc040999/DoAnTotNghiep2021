import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'
import VueJWT from 'vuejs-jwt'
import '@mdi/font/css/materialdesignicons.css';
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vueperslides/dist/vueperslides.css'
import VueClazyLoad from 'vue-clazy-load'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


Vue.use(BootstrapVue, IconsPlugin, BootstrapVueIcons)
Vue.use(VueJWT)
Vue.use(VueClazyLoad);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')

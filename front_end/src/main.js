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
import Toasted from 'vue-toasted';
import VueChatScroll from 'vue-chat-scroll';
import VueHorizontalList from 'vue-horizontal-list';
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'

Vue.use(VueRangeSlider)
Vue.use(BootstrapVue, IconsPlugin, BootstrapVueIcons)
Vue.use(VueJWT)
Vue.use(VueClazyLoad);
Vue.use(VueChatScroll)
Vue.use(VueHorizontalList)
Vue.config.productionTip = false
Vue.use(Toasted, {
  type: 'center',
  duration: 3000,
  wordWrap: true,
  width: '150px'
})
new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')

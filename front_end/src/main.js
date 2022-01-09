import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify'
import VueJWT from 'vuejs-jwt'
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueJWT)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
window.axios = require('axios');
import { Mixin } from '../mixin.js'

Vue.config.productionTip = false

Vue.mixin(Mixin),

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

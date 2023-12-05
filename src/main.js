import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { VueMaskDirective } from 'v-mask';

import '@/components/style/style.css';

Vue.directive('mask', VueMaskDirective);

Vue.use(VueToast);

Vue.use(Vuetify);

const vuetify = new Vuetify();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

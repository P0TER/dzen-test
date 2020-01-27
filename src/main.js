import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueMask from 'v-mask';
import Vuelidate from 'vuelidate';
import i18n from "./localization";

Vue.use(Vuelidate);
Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

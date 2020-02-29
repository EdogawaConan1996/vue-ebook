import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
import i18n from './lang';

import './assets/styles/icon.css';
import './assets/styles/global.scss';

import './utils/createApi'

// eslint-disable-next-line no-unused-vars
import Mock from './mock';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')

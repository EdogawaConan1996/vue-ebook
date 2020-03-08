import Vue from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';

import router from './router';
import store from './store';
import i18n from './lang';

import './assets/styles/icon.css';
import './assets/styles/global.scss';
import loading from './assets/images/loading2.jpeg';
import errorImg from './assets/images/imooc.jpeg';

import './utils/createApi';


Vue.config.productionTip = false
Vue.use(VueLazyload,{
  preload: 1,
  error: errorImg,
  loading,
  attempt: 1
})

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')

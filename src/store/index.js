import Vue from 'vue';
import Vuex from 'vuex';

import Book from './modules/book'
import StoreHome from './modules/storeHome'
import StoreShelf from './modules/storeShelf'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Book,
    StoreHome,
    StoreShelf
  }
})

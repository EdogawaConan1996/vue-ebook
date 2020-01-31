import Vue from 'vue';
import Vuex from 'vuex';

import Book from './modules/book'
import StoreHome from './modules/storeHome'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Book,
    StoreHome
  }
})
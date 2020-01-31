export default {
  namespaced: true,
  state: { 
    hotSearchOffsetY: 0,
    flapCardVisible: false
  },
  getters: {
    getHotSearchOffsetY: state => state.hotSearchOffsetY,
    getFlapCardVisible: state => state.flapCardVisible
  },
  mutations: {
    setHotSearchOffsetY: (state, hotSearchOffsetY) => {
      state.hotSearchOffsetY = hotSearchOffsetY;
    },
    setFlapCardVisible: (state, flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    }
  },
  actions: {
    setHotSearchOffsetYAction: ({ commit }, hotSearchOffsetY) => {
      commit('setHotSearchOffsetY', hotSearchOffsetY);
    },
    setFlapCardVisibleAction: ({ commit }, flapCardVisible) => {
      commit('setFlapCardVisible', flapCardVisible)
    }
  }
};

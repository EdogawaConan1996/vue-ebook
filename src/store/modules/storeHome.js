export default {
  namespaced: true,
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: false,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: false
  },
  getters: {
    getHotSearchOffsetY: state => state.hotSearchOffsetY,
    getFlapCardVisible: state => state.flapCardVisible,
    getIsEditMode: state => state.isEditMode,
    getShelfList: state => state.shelfList,
    getShelfSelected: state => state.shelfSelected,
    getShelfTitleVisible: state => state.shelfTitleVisible
  },
  mutations: {
    setHotSearchOffsetY: (state, hotSearchOffsetY) => {
      state.hotSearchOffsetY = hotSearchOffsetY;
    },
    setFlapCardVisible: (state, flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    },
    setIsEditMode: (state, isEditMode) => {
      state.isEditMode = isEditMode
    },
    setShelfList: (state, shelfList) => {
      state.shelfList = shelfList
    },
    setShelfSelected: (state, shelfSelected) => {
      state.shelfSelected = shelfSelected
    },
    setShelfTitleVisible: (state, shelfTitleVisible) => {
      state.shelfTitleVisible = shelfTitleVisible
    }
  },
  actions: {
    setHotSearchOffsetYAction: ({ commit }, hotSearchOffsetY) => {
      commit('setHotSearchOffsetY', hotSearchOffsetY);
    },
    setFlapCardVisibleAction: ({ commit }, flapCardVisible) => {
      commit('setFlapCardVisible', flapCardVisible)
    },
    setIsEditModeAction: ({ commit }, isEditMode) => {
      commit('setIsEditMode', isEditMode);
    },
    setShelfListAction: ({ commit }, shelfList) => {
      commit('setShelfList', shelfList)
    },
    setShelfSelectedAction: ({ commit }, shelfSelected) => {
      commit('setShelfSelected', shelfSelected);
    },
    setShelfTitleVisibleAction: ({ commit }, shelfTitleVisible) => {
      commit('setShelfTitleVisible', shelfTitleVisible)
    }
  }
};

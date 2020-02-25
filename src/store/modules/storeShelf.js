export default {
  namespaced: true,
  state: {
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true,
    offsetY: 0
  },
  getters: {
    getIsEditMode: state => state.isEditMode,
    getShelfList: state => state.shelfList,
    getShelfSelected: state => state.shelfSelected,
    getShelfTitleVisible: state => state.shelfTitleVisible,
    getOffsetY: state => state.offsetY
  },
  mutations: {
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
    },
    setOffsetY: (state, offsetY) => {
      state.offsetY = offsetY
    }
  },
  actions: {
    setIsEditModeAction: ({commit}, isEditMode) => {
      commit('setIsEditMode', isEditMode)
    },
    setShelfListAction: ({commit}, shelfList) => {
      commit('setShelfList', shelfList)
    },
    setShelfSelectedAction: ({commit}, shelfSelected) => {
      commit('setShelfSelected', shelfSelected)
    },
    setShelfTitleVisibleAction: ({commit}, shelfTitleVisible) => {
      commit('setShelfTitleVisible', shelfTitleVisible)
    },
    setOffsetYAction: ({commit}, offsetY) => {
      commit('setOffsetY', offsetY)
    }
  }
}

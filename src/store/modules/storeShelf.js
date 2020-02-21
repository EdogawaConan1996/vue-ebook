export default {
  namespaced: true,
  state: {
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true
  },
  getters: {
    getIsEditMode: state => state.isEditMode,
    getShelfList: state => state.shelfList,
    getShelfSelected: state => state.shelfSelected,
    getShelfTitleVisible: state => state.shelfTitleVisible
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
    }
  }
}

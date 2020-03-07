export default {
  namespaced: true,
  state: {
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true,
    offsetY: 0,
    shelfCategory: [],
    currentType: 1
  },
  getters: {
    getIsEditMode: state => state.isEditMode,
    getShelfList: state => state.shelfList,
    getShelfSelected: state => state.shelfSelected,
    getShelfTitleVisible: state => state.shelfTitleVisible,
    getOffsetY: state => state.offsetY,
    getShelfCategory: state => state.shelfCategory,
    getCurrentType: state => state.currentType
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
    },
    setShelfCategory: (state, shelfCategory) => {
      state.shelfCategory = shelfCategory
    },
    setCurrentType: (state, currentType) => {
      state.currentType = currentType
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
    },
    setShelfCategoryAction: ({commit}, shelfCategory) => {
      commit('setShelfCategory', shelfCategory)
    },
    setCurrentTypeAction: ({commit}, currentType) => {
      commit('setCurrentType', currentType)
    }
  }
}

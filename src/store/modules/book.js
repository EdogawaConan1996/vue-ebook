export default {
  namespaced: true,
  state: {
    fileName: '',
    menuVisible: true
  },
  getters: {
    getFileName: state => state.fileName,
    getMenuVisible: state => state.menuVisible
  },
  mutations: {
    setFileName: (state, fileName) => {
      state.fileName = fileName
    },
    setMenuVisible: (state) => {
      state.menuVisible = !state.menuVisible
    }
  },
  actions: {
    setFileNameAction: ({ commit }, fileName) => {
      commit('setFileName', fileName)
    },
    setMenuVisibleAction: ({ commit }) => {
      commit('setMenuVisible')
    }
  }
}
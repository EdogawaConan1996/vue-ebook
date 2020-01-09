export default {
  namespaced: true,
  state: {
    fileName: '',
    menuVisible: true,
    settingVisible: -1,
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: true,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
  },
  getters: {
    getFileName: state => state.fileName,
    getMenuVisible: state => state.menuVisible,
    getSettingVisible: state => state.settingVisible,
    getDefaultFontSize: state => state.defaultFontSize,
    getDefaultFontFamily: state => state.defaultFontFamily,
    getFontFamilyVisible: state => state.fontFamilyVisible,
    getDefaultTheme: state => state.defaultTheme,
    getBookAvailable: state => state.bookAvailable,
    getProgress: state => state.progress,
    getSection: state => state.section,
    getIsPaginating: state => state.isPaginating,
    getCurrentBook: state => state.currentBook,
    getNavigation: state => state.navigation,
    getCover: state => state.cover,
    getMetaData: state => state.metadata,
    getPaginate: state => state.paginate,
    getOffsetY: state => state.offsetY,
    getIsBookmark: state => state.isBookmark
  },
  mutations: {
    setFileName: (state, fileName) => {
      state.fileName = fileName
    },
    setMenuVisible: (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    setSettingVisible: (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    setDefaultFontSize: (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    setDefaultFontFamily: (state, font) => {
      state.defaultFontFamily = font
    },
    setFontFamilyVisible: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    setDefaultTheme: (state, theme) => {
      state.defaultTheme = theme
    },
    setBookAvailable: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    setProgress: (state, progress) => {
      state.progress = progress
    },
    setSection: (state, section) => {
      state.section = section
    },
    setIsPaginating: (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    setCurrentBook: (state, currentBook) => {
      state.currentBook = currentBook
    },
    setNavigation: (state, navigation) => {
      state.navigation = navigation
    },
    setCover: (state, cover) => {
      state.cover = cover
    },
    setMetaData: (state, metadata) => {
      state.metadata = metadata
    },
    setPaginate: (state, paginate) => {
      state.paginate = paginate
    },
    setPageList: (state, pagelist) => {
      state.pagelist = pagelist
    },
    setOffsetY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    setIsBookmark: (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  },
  actions: {
    setFileNameAction: ({ commit }, fileName) => {
      commit('setFileName', fileName)
    },
    setMenuVisibleAction: ({ commit }, menuVisible) => {
      commit('setMenuVisible', menuVisible)
    },
    setSettingVisibleAction: ({ commit }, settingVisible) => {
      commit('setSettingVisible', settingVisible)
    },
    setDefaultFontSizeAction: ({ commit }, defaultFontSize) => {
      commit('setDefaultFontSize', defaultFontSize)
    },
    setDefaultFontFamilyAction: ({ commit }, defaultFontFamily) => {
      commit('setDefaultFontFamily', defaultFontFamily)
    },
    setFontFamilyVisibleAction: ({ commit }, visible) => {
      commit('setFontFamilyVisible', visible)
    },
    setDefaultThemeAction: ({ commit }, theme) => {
      commit('setDefaultTheme', theme)
    },
    setBookAvailableAction: ({ commit }, bookAvailable) => {
      commit('setBookAvailable', bookAvailable)
    },
    setProgressAction: ({ commit }, progress) => {
      commit('setProgress', progress)
    },
    setSectionAction: ({ commit }, section) => {
      commit('setSection', section)
    },
    setIsPaginatingAction: ({ commit }, isPaginating) => {
      commit('setIsPaginating', isPaginating)
    },
    setCurrentBookAction: ({ commit }, currentBook) => {
      commit('setCurrentBook', currentBook)
    },
    setNavigationAction: ({ commit }, navigation) => {
      commit('setNavigation', navigation)
    },
    setCoverAction: ({ commit }, cover) => {
      commit('setCover', cover)
    },
    setMetaDataAction: ({ commit }, metadata) => {
      commit('setMetaData', metadata)
    },
    setPaginateAction: ({ commit }, paginate) => {
      commit('setPaginate', paginate)
    },
    setPageListAction: ({ commit }, pagelist) => {
      commit('setPageList', pagelist)
    },
    setOffsetYAction: ({ commit }, offsetY) => {
      commit('setOffsetY', offsetY)
    },
    setIsBookmarkAction: ({ commit }, isBookmark) => {
      commit('setIsBookmark', isBookmark)
    },
  }
}

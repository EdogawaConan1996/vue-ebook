import {mapActions, mapGetters} from 'vuex';
import {addCss, FONT_SIZE_LIST, removeAllCss, themeList} from "../config/book";

export default {
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST,
      themeList: themeList(this)
    }
  },
  computed: {
    ...mapGetters({
      'fileName': 'Book/getFileName',
      'menuVisible': 'Book/getMenuVisible',
      'settingVisible': 'Book/getSettingVisible',
      'defaultFontSize': 'Book/getDefaultFontSize',
      'defaultFontFamily': 'Book/getDefaultFontFamily',
      'fontFamilyVisible': 'Book/getFontFamilyVisible',
      'defaultTheme': 'Book/getDefaultTheme',
      'bookAvailable': 'Book/bookAvailable',
      'section': 'Book/getProgress',
      'isPaginating': 'Book/getIsPaginating',
      'currentBook': 'Book/getCurrentBook',
      'navigation': 'Book/getNavigation',
      'cover': 'Book/getCover',
      'metadata': 'Book/getMetaData',
      'paginate': 'Book/getPaginate',
      'offsetY': 'Book/offsetY',
      'isBookmark': 'Book/getIsBookmark',
    })
  },
  methods: {
    ...mapActions({
      'setMenuVisible': 'Book/setMenuVisibleAction',
      'setFileName': 'Book/setFileNameAction',
      'setSettingVisible': 'Book/setSettingVisibleAction',
      'setDefaultFontSize': 'Book/setDefaultFontSizeAction',
      'setDefaultFontFamily': 'Book/setDefaultFontFamilyAction',
      'setFontFamilyVisible': 'Book/setFontFamilyVisibleAction',
      'setDefaultTheme': 'Book/setDefaultThemeAction',
      'setBookAvailable': 'Book/setBookAvailableAction',
      'setProgress': 'Book/setProgressAction',
      'setSection': 'Book/setSectionAction',
      'setIsPaginating': 'Book/setIsPaginatingAction',
      'setCurrentBook': 'Book/setCurrentBookAction',
      'setNavigation': 'Book/setNavigationAction',
      'setCover': 'Book/setCoverAction',
      'setMetaData': 'Book/setMetaDataAction',
      'setPaginate': 'Book/setPaginateAction',
      'setPageList': 'Book/setPageListAction',
      'setOffsetY': 'Book/setOffsetYAction',
      'setIsBookmark': 'Book/setIsBookmarkAction'
    }),
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default': addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_default.css`); break;
        case 'Eye': addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_eye.css`); break;
        case 'Gold': addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_gold.css`); break;
        case 'Night': addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_night.css`); break;
        default: addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_default.css`); break;
      }
    }
  }
}

import {mapActions, mapGetters} from 'vuex';
import {addCss, FONT_SIZE_LIST, removeAllCss, themeList} from "../config/book";
import {getBookmark, getReadTime, saveLocation} from "../utils/storage";

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
      'progress': 'Book/getProgress',
      'bookAvailable': 'Book/getBookAvailable',
      'section': 'Book/getSection',
      'isPaginating': 'Book/getIsPaginating',
      'currentBook': 'Book/getCurrentBook',
      'navigation': 'Book/getNavigation',
      'cover': 'Book/getCover',
      'metadata': 'Book/getMetaData',
      'pageList': 'Book/getPageList',
      'paginate': 'Book/getPaginate',
      'offsetY': 'Book/getOffsetY',
      'isBookmark': 'Book/getIsBookmark',
    }),
    getReadTimeText() {
      const readTimeMinute = getReadTime(this.fileName) ? Math.ceil(getReadTime(this.fileName) / 60) : 0
      return this.$t('book.haveRead').replace('$1', readTimeMinute)
    },
    getSectionName () {
      return this.section ? this.navigation[this.section].label : ''
    }
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
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      if (!currentLocation || !currentLocation.start) {
        return
      }
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi);
      this.setProgress(Math.floor(progress * 100)).then(() => {
        // this.updateProgressBg()
        saveLocation(this.fileName,startCfi)
        this.setSection(currentLocation.start.index)
      });
      const bookmark = getBookmark(this.fileName)
      if (bookmark) {
        const isContained = bookmark.some(item => {
          return item.cfi === startCfi
        });
        if (isContained) {
          this.setIsBookmark(true)
        } else {
          this.setIsBookmark(false)
        }
      } else {
        this.setIsBookmark(false)
      }
      // eslint-disable-next-line no-console
      console.log(this.pageList)
      if (this.pageList) {
        const totalPage = this.pageList.length;
        const currentPage = currentLocation.start.location;
        // eslint-disable-next-line no-console
        console.log(this.pageList,totalPage,currentPage)
        if (currentPage &&  currentPage > 0) {
          this.setPaginate(currentPage + ' / ' + totalPage)
        } else {
          this.setPaginate('')
        }
      } else {
        this.setPaginate('')
      }
    },
    display(target, callback) {
      if (target) {
        return this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation();
          if (callback) {
            callback()
          }
        })
      } else {
        return this.currentBook.rendition.display().then(() => {
          this.refreshLocation();
          if (callback) {
            callback()
          }
        })
      }
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false)
    },
  }
}

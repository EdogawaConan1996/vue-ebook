<template>
  <div class="ebook-reader">
    <div id="book-wrapper"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import ebookMixin from "../../mixins/ebookMixin";
import {
  getFontFamily,
  getFontSize,
  getLocation,
  getTheme,
  saveFontFamily,
  saveFontSize,
  saveTheme
} from "../../utils/storage";
import {find, flatten} from "../../utils/tools";
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  data() {
    return {
      book: null,
      rendition: null,
      touchStartX: 0,
      // touchStartY: 0,
      touchStartTime: 0
    }
  },
  methods: {
    initEpub() {
      const baseUrl = `${process.env.VUE_APP_RES_URL}/epubs/`;
      const url = `${baseUrl}${this.fileName}.epub`;
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.parseBook();
      this.book.ready.then(() => {
        // 用于精确分页
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(() => {
        this.setBookAvailable(true);
        this.refreshLocation()
      })
    },
    initGesture() {
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX;
        // this.touchStartY = event.touches[0].clientY
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        // const touchEndY = event.touches[0].clientY
        const touchEndTime = event.timeStamp;
        const touchTime = touchEndTime - this.touchStartTime;
        const touchDistanceX = touchEndX - this.touchStartX;
        if (Math.abs(touchDistanceX) < 40 || touchTime > 500) {
          if (this.menuVisible) {
            this.hideTitleAndMenu()
          } else {
            this.toggleTitleAndMenu()
          }
        }
        if (touchDistanceX < -50) {
          this.nextPage()
        } else if (touchDistanceX > 50) {
          this.prevPage()
        }
        event.preventDefault();
        event.stopPropagation()
      });
    },
    initRendition() {
      this.rendition = this.book.renderTo('book-wrapper', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      });
      const location = getLocation(this.fileName)
      this.display(location,() => {
        this.initFontSize();
        this.initFontFamily();
        this.initTheme();
        this.initGlobalStyle();
      });
      this.rendition.hooks.content.register( async contents => {
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`);
      });
    },
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.setDefaultFontFamily(font)
        if (font === 'Default') {
          this.rendition.themes.font('Times New Roman')
        } else {
          this.rendition.themes.font(font)
        }
      }
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        this.rendition.themes.fontSize(this.defaultFontSize)
        saveFontSize(this.fileName, fontSize)
      } else {
        this.setDefaultFontSize(fontSize)
        this.rendition.themes.fontSize(fontSize)
      }
    },
    initTheme() {
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      // eslint-disable-next-line no-console
      let theme = getTheme();
      if (!theme) {
        saveTheme(this.defaultTheme)
        this.rendition.themes.select(this.defaultTheme)
      } else {
        this.setDefaultTheme(theme)
        this.rendition.themes.select(theme)
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(true)
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        });
        this.hideTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        });
        this.hideTitleAndMenu()
      }
    },
    parseBook() {
      this.book.loaded.cover.then((cover) => {
        this.book.archive.createUrl(cover).then((url) => {
          this.setCover(url)
        })
      });
      this.book.loaded.metadata.then((metadata) => {
        this.setMetaData(metadata)
      });
      this.book.loaded.navigation.then((nav) => {
        const navigation = flatten(nav.toc);
        navigation.forEach(item => {
          item.level = find(navigation, item)
        });
        this.setNavigation(navigation)
      })
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split('|')[1];
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
</style>

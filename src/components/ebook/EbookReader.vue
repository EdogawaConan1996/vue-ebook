<template>
  <div class="ebook-reader">
    <div id="book-wrapper"></div>
    <div class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove="onMouseMove"
      @mouseup.left="onMouseEnd">
    </div>
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
import {getLocalForage} from "../../utils/localforage";
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  data() {
    return {
      book: null,
      rendition: null,
      touchStartX: 0,
      // touchStartY: 0,
      touchStartTime: 0,
      firstOffsetY: 0,
      mouseState: null,  // 1-鼠标进入 2-鼠标进入之后的移动 3-鼠标从移动状态松手 4-鼠标还原
      mouseStartTime: 0
    }
  },
  methods: {
    onMouseEnter(event) {
      this.mouseState = 1;
      this.mouseStartTime = event.timeStamp;
      event.preventDefault();
      event.stopPropagation();
    },
    onMouseMove(event) {
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = event.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = event.clientY
        }
      }
      event.preventDefault();
      event.stopPropagation();
    },
    onMouseEnd(event) {
      if (this.mouseState === 2) {
        this.firstOffsetY = 0;
        this.setOffsetY(0);
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = event.timeStamp - this.mouseStartTime
      if (time < 200) {
        this.mouseState = 4
      }
      event.preventDefault();
      event.stopPropagation();
    },
    onMaskClick(event) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return
      }
      const offsetX = event.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        if (this.menuVisible) {
          this.hideTitleAndMenu()
        } else {
          this.toggleTitleAndMenu()
        }
      }
    },
    move(event) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = event.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = event.changedTouches[0].clientY
      }
      event.preventDefault();
      event.stopPropagation()
    },
    moveEnd() {
      this.firstOffsetY = 0;
      this.setOffsetY(0);
    },
    initEpub(url) {
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.parseBook();
      this.book.ready.then(() => {
        // 用于精确分页
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then((locations) => {
        this.navigation.forEach(nav => {
          nav.pageList = []
        });
        locations.forEach(item => {
          const loc = item.match(/\[(.*)\]!/)[1];
          this.navigation.forEach(nav => {
            if (nav.href) {
              const href = nav.href.match(/^(.*)\.html$/)[1];
              if (href === loc) {
                nav.pageList.push(item)
              }
            }
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = 1
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pageList.length + 1
          })
        });
        // eslint-disable-next-line no-console
        console.log(locations);
        this.setPageList(locations);
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
        // eslint-disable-next-line no-console
        console.log(theme.name,theme.style);
        this.rendition.themes.register(theme.name, theme.style)
      });
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
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    getLocalForage(fileName, (err,blob) => {
      if (!err && blob) {
        this.setFileName(books.join('/')).then(() => {
          this.initEpub(blob)
        })
      } else {
        this.setFileName(books.join('/')).then(() => {
          const baseUrl = `${process.env.VUE_APP_RES_URL}/epubs/`;
          const url = `${baseUrl}${this.fileName}.epub`;
          this.initEpub(url)
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask {
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>

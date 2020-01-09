<template>
  <div class="ebook-reader">
    <div id="book-wrapper"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import ebookMixin from "../../mixins/ebookMixin";
import {getFontFamily, getFontSize, saveFontFamily, saveFontSize} from "../../utils/storage";
export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  data() {
    return {
      book: null,
      rendition: null,
      touchStartX: 0,
      // touchStratY: 0,
      touchStartTime: 0
    }
  },
  methods: {
    initEpub() {
      const baseUrl = 'http://39.97.112.165:8000/epubs/';
      const url = `${baseUrl}${this.fileName}.epub`;
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.rendition = this.book.renderTo('book-wrapper', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      });
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX;
        // this.touchStratY = event.touches[0].clientY
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
      this.rendition.hooks.content.register( async contents => {
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`);
        await contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`);
        // eslint-disable-next-line no-console
        console.log('字体全部加载完毕')
      });
      this.rendition.display().then(() => {
        this.initFontFamily()
        this.initEpub()
      })
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
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(true)
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
      this.setFontFamilyVisible(false)
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
        this.hideTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
        this.hideTitleAndMenu()
      }
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

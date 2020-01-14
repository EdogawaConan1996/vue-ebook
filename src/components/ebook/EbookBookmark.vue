<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"/>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <Bookmark :width="15" :height="35" :color="color"/>
    </div>
  </div>
</template>

<script type="text/javascript">
import Bookmark from "../common/Bookmark";
import {realPx} from "../../utils/tools";
import ebookMixin from "../../mixins/ebookMixin";
import {getBookmark} from "../../utils/storage";
const BLUE = '#346cbc';
const BLACK = '#000000';
export default {
  name: "EbookBookmark",
  components: {Bookmark},
  mixins: [ebookMixin],
  data() {
    return {
      text: '',
      color: '#000000',
      isFixed: false
    }
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      }
    }
  },
  methods: {
    beforeHeight() {
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark');
        this.color = BLUE
      } else {
        this.text = this.$t('book.pulldownAddMark');
        this.color = BLACK
      }
      this.isFixed = false
    },
    beforeThreshold(value) {
      this.$refs.bookmark.style.top = `${-value}px`;
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark');
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark');
        this.color = BLACK
        this.isFixed = false
      }
      const iconDown = this.$refs.iconDown;
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
      this.isFixed = false
    },
    afterThreshold(value) {
      this.$refs.bookmark.style.top = `${-value}px`;
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark');
        this.color = BLACK
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark');
        this.color = BLUE
        this.isFixed = true
      }
      const iconDown = this.$refs.iconDown;
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    },
    restore() {
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px`;
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
        if (this.isFixed) {
          this.setIsBookmark(true);
          this.addBookmark()
        } else {
          this.setIsBookmark(false)
          // this.removeBookmark()
        }
      }, 200)
    },
    addBookmark() {
      this.bookmark = getBookmark(this.fileName)
      const currentLocation = this.currentBook.rendition.currentLocation();
      const cfiBase = currentLocation.start.cfi.replace(/!.*/,'');
      // eslint-disable-next-line no-useless-escape
      const startCfi = currentLocation.start.cfi.replace(/.*!/,'').replace('/\)$/','');
      // eslint-disable-next-line no-useless-escape
      const endCfi = currentLocation.end.cfi.replace(/.*!/,'').replace('/\)$/','');
      const cfiRange = `${cfiBase}!,${startCfi},${endCfi})`;
      this.currentBook.getRange(cfiRange).then((range) => {
        // eslint-disable-next-line no-useless-escape
        const text = range.toString().replace('/\s\s/g', '')
        // eslint-disable-next-line no-console
        console.log(text);
      })
    }
  },
  watch: {
    offsetY(value) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible > 0) {
        return
      }
      if(value >= this.height && value < this.threshold) {
        this.beforeThreshold(value)
      } else if (value >= this.threshold) {
        this.afterThreshold(value)
      } else if (value > 0 && value < this.height) {
        this.beforeHeight()
      } else if (value === 0) {
        this.restore()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: #000;
        transition: all 0.2s linear;
        @include center();
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }

</style>
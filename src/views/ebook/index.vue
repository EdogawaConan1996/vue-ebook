<template>
  <div class="ebook" ref="ebook">
    <ebook-bookmark/>
    <ebook-header />
    <ebook-title/>
    <ebook-reader/>
    <ebook-menu/>
    <ebook-slide/>
    <ebook-footer />
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader';
import EbookTitle from '../../components/ebook/EbookTitle';
import EbookMenu from '../../components/ebook/EbookMenu';
import EbookSlide from '../../components/ebook/EbookSlide.vue';
import EbookBookmark from '../../components/ebook/EbookBookmark';
import EbookHeader from '../../components/ebook/EbookHeader.vue';
import EbookFooter from '../../components/ebook/EbookFooter.vue';
import {getReadTime, saveReadTime} from "../../utils/storage";
import ebookMixin from "../../mixins/ebookMixin";
import {animationConfig} from "../../utils/tools";
export default {
  name: 'index',
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookSlide,
    EbookBookmark,
    EbookHeader,
    EbookFooter
  },
  data() {
    return {
      task: null
    }
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        readTime = 0;
      }
      this.task = setInterval(() => {
        readTime++;
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName,readTime);
        }
      },1000)
    },
    move(value) {
      this.$refs.ebook.style.top = value + 'px';
      this.$refs.ebook.style.transition = `all ${animationConfig().animationTime} ${animationConfig().animationType}`;
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    },
    restore() {
      this.$refs.ebook.style.top = '0';
      this.$refs.ebook.style.transition = `all ${animationConfig().animationTime} ${animationConfig().animationType}`;
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  watch: {
    offsetY(value) {
      if (!this.menuVisible && this.bookAvailable) {
        if (value > 0) {
          this.move(value)
        } else if (value === 0) {
          this.restore()
        }
      }
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
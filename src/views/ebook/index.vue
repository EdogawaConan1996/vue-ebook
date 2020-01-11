<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
		<ebook-slide></ebook-slide>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader';
import EbookTitle from '../../components/ebook/EbookTitle';
import EbookMenu from '../../components/ebook/EbookMenu';
import EbookSlide from '../../components/ebook/EbookSlide.vue';
import {getReadTime, saveReadTime} from "../../utils/storage";
import ebookMixin from "../../mixins/ebookMixin";
export default {
  name: 'index',
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
		EbookSlide
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
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName,readTime);
        }
      },1000)
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
</style>
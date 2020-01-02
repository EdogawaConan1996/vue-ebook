<template>
  <div class="ebook-reader">
    <div id="book-wrapper"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Epub from 'epubjs'
export default {
  name: 'EbookReader',
  data() {
    return {
      book: null,
      rendition: null,
      touchStartX: 0,
      // touchStratY: 0,
      touchStartTime: 0
    }
  },
  computed: {
    ...mapGetters({
      'fileName': 'Book/getFileName'
    })
  },
  methods: {
    ...mapActions({
      'setFileName': 'Book/setFileNameAction',
      'setMenuVisible': 'Book/setMenuVisibleAction'
    }),
    initEpub() {
      const baseUrl = 'http://39.97.112.165:8000/epubs/'
      const url = `${baseUrl}${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('book-wrapper', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      this.rendition.on('touchstart', (event) => {
        this.touchStartX = event.changedTouches[0].clientX
        // this.touchStratY = event.touches[0].clientY
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX
        // const touchEndY = event.touches[0].clientY
        const touchEndTime = event.timeStamp
        const touchTime = touchEndTime - this.touchStartTime
        const touchDistanceX = touchEndX - this.touchStartX
        if (Math.abs(touchDistanceX) < 40 || touchTime > 500) {
          this.showTitleAndMenu()
        }
        if (touchDistanceX < -50) {
          this.nextPage()
        } else if (touchDistanceX > 50) {
          this.prevPage()
        }
        event.preventDefault()
        event.stopPropagation()
      })
      this.rendition.display()
    },
    showTitleAndMenu() {
      this.setMenuVisible()
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.split('|')[1]
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss" 
</style>
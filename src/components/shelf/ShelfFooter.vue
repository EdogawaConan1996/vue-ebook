<template>
   <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper"
         :class="{'is-selected': isSelected}"
         v-for="item in tabs"
         :key="item.index"
         @click="onTabClick(item)">
      <div class="shelf-footer-tab">
        <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 && !isDownload"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 && isDownload"></div>
        <div class="icon-move tab-icon" v-if="item.index === 3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
        <div class="tab-text" :class="{'remove-text': item.index === 4}">{{label(item)}}</div>
      </div>
    </div>
   </div>
</template>

<script>
import {storeShelfMixin} from "../../mixins/storeShelfMixin";
import {removeLocalStorage, saveBookShelf} from "../../utils/storage";
import {download} from "../../api/store";
import {removeLocalForage} from "../../utils/indexDB";

export default {
  name: "ShelfFooter",
  mixins: [storeShelfMixin],
  data() {
    return {
      popupMenu: null
    }
  },
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    tabs() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2
        },
        {
          label: this.$t('shelf.move'),
          index: 3
        },
        {
          label: this.$t('shelf.remove'),
          index: 4
        }
      ]
    },
    isPrivate() {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every(item => item.private)
      }
    },
    isDownload() {
      if (!this.isSelected) {
        return false
      } else {
        return this.shelfSelected.every(item => item.cache)
      }
    }
  },
  methods: {
    hidePopup() {
      this.popupMenu.hide()
    },
    showPrivate() {
      this.popupMenu = this.popup({
        $props: {
          title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
          btn: [
            {
              text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
              click: () => {
                this.setPrivate()
              }
            },
            {
              text: this.$t('shelf.cancel'),
              click: () => {
                this.hidePopup()
              }
            }
          ]
        },
      });
      this.popupMenu.show()
    },
    setPrivate() {
      let isPrivate;
      if (this.isPrivate) {
        isPrivate = false
      } else {
        isPrivate = true
      }
      this.onComplete()
      saveBookShelf(this.shelfList)
      if (isPrivate) {
        this.simpleToast(this.$t('shelf.setPrivateSuccess'))
      } else {
        this.simpleToast(this.$t('shelf.closePrivateSuccess'))
      }
    },
    onComplete() {
      this.hidePopup()
      this.setIsEditMode(false)
      saveBookShelf(this.shelfList)
    },
    showDownload() {
      this.popupMenu = this.popup({
        $props: {
          title: this.isDownload ? this.$t('shelf.removePrivateTitle') : this.$t('shelf.setDownLoadTitle'),
          btn: [
            {
              text: this.isDownload ? this.$t('shelf.close') : this.$t('shelf.open'),
              click: () => {
                this.setDownload()
              }
            },
            {
              text: this.$t('shelf.cancel'),
              click: () => {
                this.hidePopup()
              }
            }
          ]
        }
      });
      this.popupMenu.show()
    },
    async setDownload() {
      this.onComplete()
      if (this.isDownload) {
        this.removeSelectedBook()
      } else {
        await this.downloadSelectedBook()
        saveBookShelf(this.shelfList)
        this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
      }
    },
    removeSelectedBook() {
      Promise.all(this.shelfSelected.map(book => this.removeBook(book))).then(books => {
        books.map(book => {
          book.cache = false
        })
        saveBookShelf(this.shelfList)
        this.simpleToast(this.$t('shelf.setDownloadSuccess'))
      })
    },
    removeBook(book) {
      return new Promise((resolve, reject) => {
        removeLocalStorage(`${book.categoryText}/${book.fileName}-info`)
        removeLocalForage(book.fileName, resolve, reject)
      })
    },
    async downloadSelectedBook() {
      for (let i = 0; i < this.shelfSelected.length; i++) {
        await this.downLoadBook(this.shelfSelected[i]).then(book => {
          book.cache = true
        })
      }
    },
    downLoadBook(book) {
      let text = ''
      const toast = this.toast({
        text
      })
      toast.continueShow()
      return new Promise((resolve, reject) => {
        download(book, book => {
          toast.remove()
          resolve(book)
        }, reject, progressEvent => {
          const progress = Math.floor(progressEvent.loaded / progressEvent.total * 100) + '%'
          const text = this.$t('shelf.progressDownLoad').replace('$1', `${book.fileName}.epub(${progress})`)
          toast.updateText(text)
        })
      })
    },
    removeSelected() {
      this.shelfSelected.forEach(selected => {
        this.setShelfList(this.shelfList.filter(book => book !== selected))
      })
      this.setShelfSelected([])
      this.onComplete()
    },
    showRemove() {
      let title;
      if (this.shelfSelected.length === 1) {
        title = this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
      } else {
        title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
      }
      this.popupMenu = this.popup({
        $props: {
          title,
          btn: [
            {
              text: this.$t('shelf.removeBook'),
              type: 'danger',
              click: () => {
                this.removeSelected()
              }
            },
            {
              text: this.$t('shelf.cancel'),
              click: () => {
                this.hidePopup()
              }
            }
          ]
        },
      });
      this.popupMenu.show()
    },
    showDialog() {
      this.dialog({}).show()
    },
    onTabClick(item) {
      if (!this.isSelected) {
        return
      }
      switch (item.index) {
        case 1: this.showPrivate(); break;
        case 2: this.showDownload(); break;
        case 3: this.showDialog(); break;
        case 4: this.showRemove(); break;
        default: break;
      }
    },
    label(item) {
      switch(item.index) {
        case 1: return this.isPrivate ? item.label2 : item.label;
        case 2: return this.isDownload ? item.label2 : item.label;
        default: return item.label;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background-color: #fff;
    box-shadow: 0 px2rem(-2) px2rem(4) rgba(0,0,0,.1);
    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;
      &.is-selected {
        opacity: 1;
      }
      .shelf-footer-tab {
        height: 100%;
        width: 100%;
        @include columnCenter();
        .icon-shelf {
          color: $color-pink
        }
        .tab-icon {
          font-size: px2rem(20);
          color: #ccc;
          opacity: 0.5;
        }
        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #ccc;
          opacity: 0.5;
          &.remove-text {
            color: $color-pink;
          }
        }
      }
    }
  }
</style>

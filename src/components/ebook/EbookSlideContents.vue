<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"/>
        </div>
        <input type="text"
          v-model="searchText"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @keyup.enter.exact="search"
          @click="showSearchPage"/>
      </div>
      <div class="slide-contents-search-cancel"
           v-if="searchVisible"
           @click="hideSearchPage">
        {{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img v-lazy="cover" class="slide-contents-book-img" />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title" v-if="metadata && metadata.title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author" v-if="metadata && metadata.creator">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText}}</div>
      </div>
    </div>
    <Scroll class="slide-contents-list"
      :top="156"
      :bottom="48"
      v-show="!searchVisible"
      ref="scroll">
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index" @click="displayByNavigation(item)">
        <span class="slide-contents-item-label" :class="{'selected': section === index}" :style="contentItemStyle(item)">{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </Scroll>
    <Scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div
        class="slide-search-item"
        v-for="(item,index) in searchList"
        :key="index"
        @click="displayBySearchList(item)"
        v-html="item.excerpt"></div>
    </Scroll>
  </div>
</template>

<script type="text/javascript">
import ebookMixin from "../../mixins/ebookMixin";
import Scroll from "../common/Scroll";
import {px2rem} from "../../utils/tools";

export default {
  name: "EbookSlideContents",
  components: {Scroll},
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false,
      searchList: [],
      searchText: ''
    }
  },
  methods: {
    hideSearchPage() {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    },
    showSearchPage() {
      this.searchVisible = true
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    displayByNavigation(item) {
      this.display(item.href, () => {
        this.hideTitleAndMenu()
      })
    },
    displayBySearchList(item) {
      this.display(item.cfi, () => {
        this.hideTitleAndMenu()
        this.currentBook.rendition.annotations.highlight(item.cfi)
      })
    },
    search() {
      const searchText = this.searchText.trim();
      if (!searchText) {
        return
      }
      this.doSearch(searchText).then(result => {
        this.searchList = result;
        this.searchList.map(item =>
          item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
        )
      })
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item => item.load(this.currentBook.load.bind(this.currentBook))
          .then(item.find.bind(item, q)).finally(item.unload.bind(item)))
      ).then(results => Promise.resolve([].concat.apply([], results)));
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center();
        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          @include center();
          font-size: px2rem(12);

        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right();
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .slide-contents-book-title {
          // width: px2rem(153.75);
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include left();
          .slide-contents-book-title-text {
            @include ellipsis2(2);
          }
        }
        .slide-contents-book-author {
          // width: px2rem(153.75);
          font-size: px2rem(12);
          margin-top: px2rem(5);
          @include left();
          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
          }
          .progress-text {
            font-size: px2rem(12);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          margin-top: px2rem(5);
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        padding: px2rem(20) 0;
        box-sizing: border-box;
        display: flex;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis();
        }
        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right();
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>

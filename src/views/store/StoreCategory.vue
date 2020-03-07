<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title" :if-show-back="true" ></shelf-title>
    <scroll
      ref="scroll"
      v-if="ifShowList"
      class="store-shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll">
      <shelf-list :data="shelfCategory.itemList" :top="42"></shelf-list>
    </scroll>
    <div v-else class="store-shelf-empty-view">{{$t('shelf.groupNone')}}</div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import Scroll from "../../components/common/Scroll";
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  import ShelfList from "../../components/shelf/ShelfList";
  import ShelfFooter from "../../components/shelf/ShelfFooter";

  export default {
    name: "StoreShelf",
    components: {ShelfFooter, ShelfList, ShelfTitle, Scroll},
    mixins: [storeShelfMixin],
    data() {
      return {
        scrollBottom: 0
      }
    },
    computed: {
      ifShowList() {
        return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    watch: {
      isEditMode(val) {
        this.scrollBottom = val ? 48 : 0
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    mounted() {
      this.getCategoryList(this.$route.query.title)
      this.setCurrentType(2)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
    .store-shelf-empty-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: px2rem(14);
      color: #333;
      @include center();
    }
  }
</style>

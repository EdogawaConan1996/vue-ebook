<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll
      ref="scroll"
      class="store-shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll">
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from "../../components/shelf/ShelfTitle";
import Scroll from "../../components/common/Scroll";
import ShelfSearch from "../../components/shelf/ShelfSearch";
import {storeShelfMixin} from "../../mixins/storeShelfMixin";
import ShelfList from "../../components/shelf/ShelfList";
import ShelfFooter from "../../components/shelf/ShelfFooter";

export default {
  name: "StoreShelf",
  components: {ShelfFooter, ShelfList, ShelfSearch, ShelfTitle, Scroll},
  mixins: [storeShelfMixin],
  data() {
    return {
      scrollBottom: 0
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
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
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
  }
</style>

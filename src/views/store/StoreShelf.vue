<template>
  <div class="store-shelf">
    <shelf-title />
    <scroll class="store-shelf-scroll-wrapper" :top="0">
      <shelf-search />
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from "../../components/shelf/ShelfTitle";
  import Scroll from "../../components/common/Scroll";
  import ShelfSearch from "../../components/shelf/ShelfSearch";
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  export default {
    name: "StoreShelf",
    components: {ShelfSearch, ShelfTitle, Scroll},
    mixins: [storeShelfMixin]
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

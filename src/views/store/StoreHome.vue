<template>
  <div class="store-home">
    <search-bar />
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
      <div>12312312</div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";
  import Scroll from "../../components/common/Scroll";
  import storeHomeMixin from "../../mixins/storeHomeMixin";
  export default {
    name: "StoreHome",
    mixins: [storeHomeMixin],
    components: {Scroll, SearchBar},
    data() {
      return {
        scrollTop: 94
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY);
        if (offsetY > 0) {
          this.scrollTop = 54
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/styles/global.scss";
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
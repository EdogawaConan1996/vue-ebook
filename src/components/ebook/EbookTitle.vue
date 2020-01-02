<template>
  <transition name="slide-down">
    <div class="ebook-title" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ebook-title',
  computed: {
    ...mapGetters({
      'menuVisible': 'Book/getMenuVisible'
    })
  },
  methods: {
    back() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: px2rem(48);
    z-index: 200;
    background-color: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,0.15);
    font-size: px2rem(22);
    .left {
      flex: 0 0 px2rem(37);
      @include left;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(37);
        @include right;
      }
    }
  }
</style>
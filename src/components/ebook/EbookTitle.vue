<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"/>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart"/>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person"/>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ebookMixin from "../../mixins/ebookMixin";
export default {
  name: 'ebook-title',
  mixins: [ebookMixin],
  methods: {
    back() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .title-wrapper {
    position: absolute;
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
      margin-left: px2rem(15);
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      margin-right: px2rem(15);
      .icon-wrapper {
        flex: 0 0 px2rem(37);
        @include right;
      }
    }
  }
</style>

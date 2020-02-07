<template>
  <div class="detail-title-wrapper" :class="{'hide-shadow': ifHideShadow}">
    <div class="title-left-wrapper" @click="back">
      <span class="icon-back" />
    </div>
    <div class="title-text" v-if="title">{{title}}</div>
    <div class="title-right-wrapper">
      <span class="icon-shelf icon" v-if="showShelf" @click="showBookShelf"/>
      <span class="icon-share" v-else/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-title',
  props: {
    title: {
      type: String,
      default: ''
    },
    showShelf: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ifHideShadow: false
    }
  },
  methods: {
    showBookShelf() {
      this.$router.push('/book-store/shelf')
    },
    showShadow() {
      this.ifHideShadow = false
    },
    hideShadow() {
      this.ifHideShadow = true
    },
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global.scss";
  .detail-title-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: px2rem(42);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0,0,0,.1);
    font-size: px2rem(20);
    color: #666;
    &.hide-shadow {
      box-shadow: none;
    }
    .title-left-wrapper {
      position: relative;
      z-index: 100;
      flex: 0 0 px2rem(42);
      margin-left: px2rem(15);
      @include left;
    }
    .title-right-wrapper {
      position: relative;
      z-index: 200;
      flex: 0 0 px2rem(42);
      margin-right: px2rem(15);
      @include right;
    }
    .title-text {
      z-index: 100;
      flex: 1;
      height: px2rem(42);
      font-size: px2rem(16);
      color: #333;
      @include center;
    }
  }
</style>

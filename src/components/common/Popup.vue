<template>
  <div class="popup" v-show="popupVisible">
    <transition name="fade">
      <div class="popup-bg" v-show="popupVisible" @click.stop.prevent="hide" @touchmove.prevent></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper">
        <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
        <div class="popup-btn"
             :class="{'danger': item.type === 'danger'}"
             v-for="(item,index) in btn"
             :key="index"
             @click="item.click">{{item.text}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Popup",
    props: {
      title: {
        type: String,
        default: ''
      },
      btn: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        popupVisible: false
      }
    },
    methods: {
      hide() {
        this.popupVisible = false
      },
      show() {
        this.popupVisible = true
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/styles/global.scss";
  .popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    .popup-bg {
      width: 100%;
      height: 100%;
    }
    .popup-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 2000;
      width: 100%;
      background: #fff;
      .popup-title {
        width: 100%;
        height: px2rem(44);
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(12);
        line-height: px2rem(14);
        padding: px2rem(15);
        box-sizing: border-box;
        color: #999;
        @include center;
      }
      .popup-btn {
        &.danger {  }
      }
    }
  }
</style>

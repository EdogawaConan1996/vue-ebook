<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index"
             @click="setTheme(item.name)">
          <div class="preview"
               :class="{'selected': item.name === defaultTheme}"
               :style="{background: item.style.body.background}"></div>
          <div class="text"
               :class="{'selected': item.name === defaultTheme}">{{item.alias}}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ebookMixin from "../../mixins/ebookMixin";
  import {saveTheme} from "../../utils/storage";

  export default {
    name: "EbookSettingTheme",
    mixins: [ebookMixin],
    methods: {
      setTheme(theme) {
        this.setDefaultTheme(theme).then(() => {
          saveTheme(theme)
          this.currentBook.rendition.themes.select(theme)
          this.initGlobalStyle()
        })
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(90);
    background: #ffffff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          border: none;
          &.selected {
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .1);
            border: px2rem(2) solid #5e6369;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          @include center;
        }
      }
    }
  }
</style>

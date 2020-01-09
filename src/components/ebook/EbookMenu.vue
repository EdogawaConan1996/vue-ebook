<template>
  <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
           v-show="menuVisible">
        <div class="icon-wrapper" :class="{'selected': settingVisible === 3}">
          <span class="icon-menu" @click="showSetting(3)"/>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 2}">
          <span class="icon-progress" @click="showSetting(2)"/>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 1}">
          <span class="icon-bright" @click="showSetting(1)" />
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 0}">
          <span class="icon-A" @click="showSetting(0)" />
        </div>
      </div>
    </transition>
    <ebook-setting-font />
    <ebook-setting-font-popup />
    <ebook-setting-theme />
    <ebook-setting-progress />
  </div>
</template>

<script>
import ebookMixin from "../../mixins/ebookMixin";
import EbookSettingFont from "./EbookSettingFont";
import EbookSettingFontPopup from "./EbookSettingFontPopup";
import EbookSettingTheme from "./EbookSettingTheme";
import EbookSettingProgress from "./EbookSettingProgress";

export default {
  name: 'ebook-menu',
  components: {EbookSettingProgress, EbookSettingTheme, EbookSettingFontPopup, EbookSettingFont},
  mixins: [ebookMixin],
  methods: {
    showSetting(index) {
      this.setSettingVisible(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-menu {
    .menu-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 200;
      display: flex;
      width: 100%;
      background: #fff;
      height: px2rem(48);
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
      font-size: px2rem(22);
      &.hide-box-shadow {
        box-shadow: none;
      }
      .icon-wrapper {
        flex: 1;
        @include center;
        .icon-progress {
          font-size: px2rem(24);
        }
        .icon-A {
          font-size: px2rem(20);
        }
      }
    }
  }
</style>

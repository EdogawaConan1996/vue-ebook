<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hideFontFamilySetting">
          <span class="icon-down2"/>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item,index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item.font)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-show="isSelected(item.font)">
            <p class="icon-check"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ebookMixin from "../../mixins/ebookMixin";
  import {FONT_FAMILY} from "../../config/book";
  import {saveFontFamily} from "../../utils/storage";

  export default {
    name: "EbookSettingFontPopup",
    mixins: [ebookMixin],
    data() {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      hideFontFamilySetting() {
        this.setFontFamilyVisible(false)
      },
      isSelected(font) {
        return font === this.defaultFontFamily
      },
      setFontFamily(font) {
        this.setDefaultFontFamily(font);
        saveFontFamily(this.fileName, font)
        if (font === 'Default') {
          this.currentBook.rendition.themes.font('Times New Roman')
        } else {
          this.currentBook.rendition.themes.font(font)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0,0,0,.1);
    background: #fff;
    .ebook-popup-title{
      position: relative;
      padding: px2rem(15);
      box-sizing: border-box;
      border-bottom: 1px solid #b8b9bb;
      @include center();
      .ebook-popup-title-icon{
        position: absolute;
        left: px2rem(15);
        top: 0;
        bottom: 0;
        font-size: px2rem(16);
        font-weight: bold;
        @include center();
      }
      .ebook-popup-title-text{
        font-size: px2rem(14);
        font-weight: bold;
      }
    }
    .ebook-popup-list-wrapper{
      .ebook-popup-item {
        display: flex;
        padding: px2rem(15);
        .ebook-popup-item-text {
          flex: 1;
          font-size: px2rem(14);
          text-align: left;
          &.selected {
            color: #346cb9;
            font-weight: bold;
          }
        }
        .ebook-popup-item-check {
          flex: 1;
          text-align: right;
          .icon-check {
            font-size: px2rem(14);
            font-weight: bold;
            color: #346cb9;
          }
        }
      }
    }
  }
</style>

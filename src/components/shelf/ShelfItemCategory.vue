<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item,index) in data.itemList" :key="index">
        <img class="shelf-item-category-img" v-lazy="item.cover" />
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: Object,
      isEditMode: Boolean
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-category {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shelf-item-category-list {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      width: 100%;
      height: 100%;
      padding-top: px2rem(5);
      box-sizing: border-box;
      .shelf-item-category-item {
        flex: 0 0 33.33%;
        height: 33.33%;
        width: 33.33%;
        padding: px2rem(5);
        box-sizing: border-box;
        &:nth-child(3n+1) {
          padding: 0 px2rem(2.5) px2rem(5) px2rem(5);
        }
        &:nth-child(3n+2) {
          padding: 0 px2rem(2.5) px2rem(5) px2rem(2.5);
        }
        &:nth-child(3n+3) {
          padding: 0 px2rem(5) px2rem(5) px2rem(2.5);
        }
        .shelf-item-category-img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .shelf-item-category-bg {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      @include center();
      font-size: px2rem(30);
      color: #ccc;
    }
  }
</style>

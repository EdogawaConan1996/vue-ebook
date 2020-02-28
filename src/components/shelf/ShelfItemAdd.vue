<template>
  <div class="shelf-item-add">
    <span class="icon-add" />
  </div>
</template>

<script>
  export default {
    name: "ShelfItemAdd"
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";

  .shelf-item-add {
    width: 100%;
    height: 100%;
    border: px2rem(1) solid #ccc;
    box-sizing: border-box;
    @include center();
    .icon-add {
      font-size: px2rem(40);
      color: #ccc;
    }
  }
</style>

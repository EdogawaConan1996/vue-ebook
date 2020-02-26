<template>
  <div class="shelf-item-book">
    <img class="shelf-item-book-cover" :src="data.cover" />
  </div>
</template>

<script>
  export default {
    name: "ShelfItemImage",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-item-book {
    height: 100%;
    width: 100%;
    .shelf-item-book-cover {
      height: 100%;
      width: 100%;
    }
  }
</style>

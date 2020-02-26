<template>
  <div class="shelf-item shelf-item-shadow">
    <component :is="data.type === 1 ? book: (data.type === 2 ? category: add)" />
  </div>
</template>

<script>
  import ShelfItemBook from "./ShelfItemBook";
  import ShelfItemCategory from "./ShelfItemCategory";
  import ShelfItemAdd from "./ShelfItemAdd";
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";

  export default {
    name: "ShelfItem",
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    mixins: [storeShelfMixin],
    data() {
      return {
        book: ShelfItemBook,
        category: ShelfItemCategory,
        add: ShelfItemAdd
      }
    },
    computed: {
      item() {
        return this.data.type === 1 ? this.book: (this.data.type === 2 ? this.category: this.add)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-item {
    width: 100%;
    height: 100%;
    background: #000;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200,200,200,.3);
    }
  }
</style>

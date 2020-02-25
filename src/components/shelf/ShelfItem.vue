<template>
  <div class="shelf-item">
    <component :is="data.type === 1 ? book: (data.type === 2 ? category: add)" />
  </div>
</template>

<script>
  import ShelfItemImage from "./ShelfItemImage";
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
        book: ShelfItemImage,
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
</style>

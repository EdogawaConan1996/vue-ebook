<template>
  <div class="shelf-item" :class="{'shelf-item-shadow': data.type !== 3}" @click="onItemCLick">
    <component
      :is="item"
      class="shelf-item-comp"
      :class="{'is-edit': isEditMode && data.type === 2}"
      :data="data" />
    <div
      class="icon-selected"
      v-show="isEditMode && data.type === 1"
      :class="{'is-selected': data.selected}" />
  </div>
</template>

<script>
import ShelfItemBook from "./ShelfItemBook";
import ShelfItemCategory from "./ShelfItemCategory";
import ShelfItemAdd from "./ShelfItemAdd";
import {storeShelfMixin} from "../../mixins/storeShelfMixin";
import { goToStoreHome } from '../../config/store';

export default {
  name: "ShelfItem",
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
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
  },
  methods: {
    onItemCLick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected
        if (this.data.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.data)
        } else {
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {
          this.$router.push({
            path: 'store/category',
            query: this.data.title
          })
        } else {
          goToStoreHome(this)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-item {
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200,200,200,.3);
    }
    .shelf-item-comp {
      opacity: 1;
      &.is-selected {
        opacity: .5;
      }
    }
    .icon-selected {
      position: absolute;
      bottom: px2rem(5);
      right: px2rem(5);
      font-size: px2rem(18);
      color: rgba(0,0,0,.4);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>

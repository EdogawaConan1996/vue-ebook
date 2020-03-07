<template>
  <div class="shelf-list" :style="{'top': shelfListTop}">
    <transition-group name="list" tag="div" id="shelf-list">
      <div class="shelf-list-item-wrapper" :style="{height: itemHeight}" v-for="item in data" :key="item.id">
        <shelf-item :data="item"/>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  import ShelfItem from "./ShelfItem";
  import {px2rem, realPx} from "../../utils/tools";

  export default {
    name: "ShelfList",
    props: {
      top: {
        type: Number,
        default: 94
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {ShelfItem},
    mixins: [storeShelfMixin],
    computed: {
      itemHeight() {
        return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
      },
      shelfListTop() {
        return `${px2rem(this.top)}rem`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    /*top: px2rem(94);*/
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    #shelf-list {
      display: flex;
      flex-flow: row wrap;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .shelf-list-item-wrapper {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        &.list-leave-active {
          display: none;
        }
        &.list-move {
          transition: transform .5s;
        }
        .shelf-list-title-wrapper {
          margin-top: px2rem(10);
        }
      }
    }
  }
</style>

<template>
  <div class="shelf-list">
    <div class="shelf-list-item-wrapper" v-for="item in shelfList" :key="item.id">
      <shelf-item :style="{height: itemHeight}" :data="item"/>
      <div class="shelf-list-title-wrapper">
        <span class="shelf-list-title title-small">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  import ShelfItem from "./ShelfItem";
  import {shelf} from "../../api/store";
  import {realPx} from "../../utils/tools";

  export default {
    name: "ShelfList",
    components: {ShelfItem},
    mixins: [storeShelfMixin],
    computed: {
      itemHeight() {
        return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
      }
    },
    methods: {
      getShelfList() {
        shelf().then(response => {
          this.setShelfList(response.bookList)
        }).catch(error => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      }
    },
    mounted() {
      this.getShelfList()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    top: px2rem(94);
    left: 0;
    z-index: 100;
    display: flex;
    flex-flow: row wrap;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .shelf-list-title-wrapper {
        margin-top: px2rem(10);
      }
    }
  }
</style>

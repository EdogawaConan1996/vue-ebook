<template>
  <div class="shelf-list">
    <div class="shelf-list-item-wrapper" v-for="item in shelfList" :key="item.id">
      <shelf-item :data="item"/>
    </div>
  </div>
</template>

<script>
  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  import ShelfItem from "./ShelfItem";
  import {shelf} from "../../api/store";

  export default {
    name: "ShelfList",
    components: {ShelfItem},
    mixins: [storeShelfMixin],
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
  }
</style>

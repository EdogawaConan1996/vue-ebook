<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
  import {px2rem} from "../../utils/tools";

  export default {
    name: "Bookmark",
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#000000'
      },
    },
    computed: {
      style() {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`,
        }
      }
    },
    methods: {
      refresh() {
        if (this.width !== 0 && this.height !== 0) {
          this.$refs.bookmark.borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(this.height - 5)}rem ${px2rem(this.height - 5)}rem`
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .bookmark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
    border-style: solid;
    border-color: #000 #000 transparent #000;
  }
</style>
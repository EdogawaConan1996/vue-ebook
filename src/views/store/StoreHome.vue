<template>
  <div class="store-home">
    <search-bar />
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll"></scroll>
    <flap-card :data="random"></flap-card>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";
  import Scroll from "../../components/common/Scroll";
  import FlapCard from '../../components/home/FlapCard';
  import storeHomeMixin from "../../mixins/storeHomeMixin";
  import {home} from "../../api/store";
  export default {
    name: "StoreHome",
    mixins: [storeHomeMixin],
    components: {Scroll, SearchBar, FlapCard},
    data() {
      return {
        scrollTop: 94,
        random: null
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY);
        if (offsetY > 0) {
          this.scrollTop = 54
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    },
    mounted() {
      home().then(response => {
        //eslint-disable-next-line no-console
        console.log(response)
        const randomIndex = Math.floor(Math.random() * response.random.length);
        this.random = response.random[randomIndex]
      }).catch(error => {
        //eslint-disable-next-line no-console
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  @import "../../assets/styles/global.scss";
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>

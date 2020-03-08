<template>
  <div class="store-home">
    <search-bar />
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage: `url('${banner}')`}" />
        <guess-you-like :data="guessYouLike" />
        <recommend :data="recommend" class="recommend"/>
        <featured :data="featured" :title-text="$t('home.featured')" :btn-text="$t('home.seeAll')" class="featured"/>
        <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
          <category-book :data="item"/>
        </div>
        <category class="category" :data="categories" />
      </div>
    </scroll>
    <flap-card :data="random"/>
  </div>
</template>

<script>
  import SearchBar from "../../components/home/SearchBar";
  import Scroll from "../../components/common/Scroll";
  import FlapCard from '../../components/home/FlapCard';
  import storeHomeMixin from "../../mixins/storeHomeMixin";
  import {home} from "../../api/store";
  import GuessYouLike from "../../components/home/GuessYouLike";
  import Recommend from "../../components/home/Recommend";
  import Featured from "../../components/home/Featured";
  import CategoryBook from "../../components/home/CategoryBook";
  import Category from "../../components/home/Category";
  export default {
    name: "StoreHome",
    mixins: [storeHomeMixin],
    components: {Category, CategoryBook, Featured, Recommend, GuessYouLike, Scroll, SearchBar, FlapCard},
    data() {
      return {
        scrollTop: 94,
        random: null,
        banner: null,
        guessYouLike: [],
        recommend: [],
        featured: [],
        categoryList: [],
        categories: []
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
        this.banner = response.banner
        this.guessYouLike = response.guessYouLike
        this.recommend = response.recommend
        //eslint-disable-next-line no-console
        console.log(this.recommend)
        this.featured = response.featured
        this.categoryList = response.categoryList
        this.categories = response.categories
      }).catch(error => {
        //eslint-disable-next-line no-console
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/styles/global.scss";
  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend {
      margin-top: px2rem(20);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .category {
      margin-top: px2rem(20);
    }
  }
</style>

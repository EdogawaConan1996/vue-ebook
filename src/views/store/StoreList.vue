<template>
  <div class="book-list-wrapper">
    <detail-title :title="title" :show-shelf="true" @back="back" ref="title" />
    <scroll class="book-list-scroll-wrapper" :top="42" @onscroll="onScroll" ref="scroll">
      <featured :data="value" :title-text="titleText ? titleText : getCategoryText(key)" btn-text="''" v-for="(value, key, index) in list" :key="index"/>
    </scroll>
  </div>
</template>

<script>
  import DetailTitle from "../../components/detail/DetailTitle";
  import Scroll from "../../components/common/Scroll";
  import Featured from "../../components/home/Featured";
  import {categoryList, categoryText} from "../../config/store";
  import {realPx} from "../../utils/tools";
  import {list} from "../../api/store";
  export default {
    name: "StoreList",
    components: {Featured, Scroll, DetailTitle},
    computed: {
      title() {
        if (this.list) {
          return this.total && this.$t('home.allBook').replace('$1', this.totalNumber)
        } else {
          return null
        }
      },
      totalNumber() {
        let num = 0
        Object.keys(this.list).forEach(key => {
          num += this.list[key].length
        })
        return num
      }
    },
    data() {
      return {
        list: null,
        total: null,
        titleText: ''
      }
    },
    methods: {
      getCategoryText(key) {
        return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
      },
      back() {
        this.$router.back()
      },
      onScroll(offsetY) {
        if (offsetY > realPx(42)) {
          this.$refs.title.showShadow()
        } else {
          this.$refs.title.hideShadow()
        }
      },
      getList() {
        list().then(response => {
          this.list = response.data
          this.total = response.total
          const category = this.$route.query.category
          const keyword = this.$route.query.keyword
          if (category) {
            const key = Object.keys(this.list).filter(item => item === category)[0]
            const data = this.list[key]
            this.list = {}
            this.list[key] = data
          } else if (keyword) {
            Object.keys(this.list).filter(key => {
              this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
              return this.list[key].length > 0
            })
            // eslint-disable-next-line no-console
            console.log(this.list)
          }
        })
      }
    },
    created() {
      this.getList()
      this.titleText = this.$route.query.categoryText
    }
  }
</script>

<style scoped>

</style>

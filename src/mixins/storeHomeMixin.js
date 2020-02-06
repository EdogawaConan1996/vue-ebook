import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      'offsetY': 'Book/getOffsetY',
      'hotSearchOffsetY': 'StoreHome/getHotSearchOffsetY',
      'flapCardVisible': 'StoreHome/getFlapCardVisible'
    })
  },
  methods: {
    ...mapActions({
      'setOffsetY': 'Book/setOffsetYAction',
      'setHotSearchOffsetY': 'StoreHome/setHotSearchOffsetYAction',
      'setFlapCardVisible': 'StoreHome/setFlapCardVisibleAction'
    }),
    showBookDetail(book) {
      // eslint-disable-next-line no-console
      console.log(book)
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.category
        }
      })
    }
  }
}

import {mapActions, mapGetters} from "vuex";
import {goToBookDetail} from "../config/store";

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
      goToBookDetail(this,book)
    }
  }
}

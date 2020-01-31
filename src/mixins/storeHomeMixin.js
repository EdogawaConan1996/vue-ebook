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
    })
  }
}
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      'offsetY': 'Book/getOffsetY'
    })
  },
  methods: {
    ...mapActions({
      'setOffsetY': 'Book/setOffsetYAction'
    })
  }
}
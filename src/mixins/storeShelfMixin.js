import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      'isEditMode': 'StoreShelf/getIsEditMode',
      'shelfList': 'StoreShelf/getShelfList',
      'shelfSelected': 'StoreShelf/getShelfSelected',
      'shelfTitleVisible': 'StoreShelf/getShelfTitleVisible',
      'offsetY': 'StoreShelf/getOffsetY'
    })
  },
  methods: {
    ...mapActions({
      'setIsEditMode': 'StoreShelf/setIsEditModeAction',
      'setShelfList': 'StoreShelf/setShelfListAction',
      'setShelfSelected': 'StoreShelf/setShelfSelectedAction',
      'setShelfTitleVisible': 'StoreShelf/setShelfTitleVisible',
      'setOffsetY': 'StoreShelf/setOffsetYAction'
    })
  }
}

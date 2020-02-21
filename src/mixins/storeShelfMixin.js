import {mapActions, mapGetters} from "vuex";

export const storeShelfMixin = {
  computed: {
    ...mapGetters({
      'isEditMode': 'StoreShelf/getIsEditMode',
      'shelfList': 'StoreShelf/getShelfList',
      'shelfSelected': 'StoreShelf/getShelfSelected',
      'shelfTitleVisible': 'StoreShelf/getShelfTitleVisible'
    })
  },
  methods: {
    ...mapActions({
      'setIsEditMode': 'StoreShelf/setIsEditModeAction',
      'setShelfList': 'StoreShelf/setShelfListAction',
      'setShelfSelected': 'StoreShelf/setShelfSelectedAction',
      'setShelfTitleVisible': 'StoreShelf/setShelfTitleVisibleAction'
    })
  }
};

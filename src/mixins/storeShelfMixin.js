import {mapActions, mapGetters} from "vuex";
import { goToBookDetail } from "../config/store";

export const storeShelfMixin = {
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
      'setShelfTitleVisible': 'StoreShelf/setShelfTitleVisibleAction',
      'setOffsetY': 'StoreShelf/setOffsetYAction'
    }),
    showBookDetail(book) {
      goToBookDetail(this,book)
    }
  }
};

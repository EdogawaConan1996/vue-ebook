import {mapActions, mapGetters} from "vuex";
import { goToBookDetail, appendAddToShelf } from "../config/store";
import { getBookShelf, saveBookShelf } from "../utils/storage";
import { shelf } from "../api/store";


export const storeShelfMixin = {
  computed: {
    ...mapGetters({
      'isEditMode': 'StoreShelf/getIsEditMode',
      'shelfList': 'StoreShelf/getShelfList',
      'shelfSelected': 'StoreShelf/getShelfSelected',
      'shelfTitleVisible': 'StoreShelf/getShelfTitleVisible',
      'offsetY': 'StoreShelf/getOffsetY',
      'shelfCategory': 'StoreShelf/getShelfCategory'
    })
  },
  methods: {
    ...mapActions({
      'setIsEditMode': 'StoreShelf/setIsEditModeAction',
      'setShelfList': 'StoreShelf/setShelfListAction',
      'setShelfSelected': 'StoreShelf/setShelfSelectedAction',
      'setShelfTitleVisible': 'StoreShelf/setShelfTitleVisibleAction',
      'setOffsetY': 'StoreShelf/setOffsetYAction',
      'setShelfCategory': 'StoreShelf/setShelfCategoryAction'
    }),
    showBookDetail (book) {
      goToBookDetail(this,book)
    },
    getShelfList() {
      let shelfList = getBookShelf();
      if (!shelfList) {
        shelf().then(response => {
          shelfList = appendAddToShelf(response.bookList)
          saveBookShelf(shelfList)
          return this.setShelfList(shelfList)
        }).catch(error => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      } else {
        return this.setShelfList(shelfList)
      }
    },
    getCategoryList(title) {
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
        this.setShelfCategory(categoryList)
      })
    }
  }
};

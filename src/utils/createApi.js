import CreateAPI from "vue-create-api";
import Vue from "vue";
import Toast from "../components/common/Toast";
import Popup from "../components/common/Popup";
import Dialog from "../components/common/Dialog";
import ShelfGroupDialog from "../components/shelf/ShelfGroupDialog";

Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(Dialog, true)
Vue.createAPI(ShelfGroupDialog, true)
Vue.mixin({
  methods: {
    toast(settings) {
      return this.$createToast({
        $props: settings
      }).show()
    },
    popup(settings) {
      return this.$createPopup({
        $props: settings
      })
    },
    simpleToast(text) {
      const toast = this.toast({text})
      toast.show()
      toast.updateText(text)
    },
    dialog() {
      return this.$createShelfGroupDialog()
    }
  }
})

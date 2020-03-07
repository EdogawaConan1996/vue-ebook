<template>
  <transition name="fade">
    <Dialog :title="dialogTitle" ref="dialog">
      <div v-if="selectGroupDialogVisible">
        <div class="dialog-list-wrapper">
          <template v-for="(item, index) in categoryList">
            <div class="dialog-list-item" :class="{'is-add': item.edit ? item.edit === 1 : false}" :key="index" @click="onGroupClick(item)" v-if="(item.edit === 2 && isInGroup) || item.edit !== 2 || !item.edit">
              <div class="dialog-list-item-text">{{item.title}}</div>
              <div class="dialog-list-icon-wrapper" v-if="shelfCategory.id === item.id">
                <span class="icon-check"/>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-if="newGroupDialogVisible">
        <div class="dialog-input-title-wrapper">
          <span class="dialog-input-title">{{$t('shelf.groupName')}}</span>
        </div>
        <div class="dialog-input-wrapper">
          <div class="dialog-input-inner-wrapper">
            <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput">
            <div class="dialog-input-clear-wrapper" @click="clear" v-show="newGroupName && newGroupName.length > 0">
              <span class="icon-close-circle-fill"></span>
            </div>
          </div>
        </div>
      </div>
      <div slot="btn">
        <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
        <div class="dialog-btn" @click="createNewGroup" :class="{'is-empty': newGroupName && newGroupName.length === 0}">{{$t('shelf.confirm')}}</div>
      </div>
    </Dialog>
  </transition>
</template>

<script>

  import {storeShelfMixin} from "../../mixins/storeShelfMixin";
  import {saveBookShelf} from "../../utils/storage";
  import {appendAddToShelf, removeAddromShelf} from "../../config/store";
  import Dialog from "../common/Dialog";

  export default {
    name: "ShelfGroupDialog",
    components: {Dialog},
    props: {
      showNewGroup: {
        type: Boolean,
        default: false
      },
      groupName: {
        type: String,
        default: ''
      }
    },
    mixins: [storeShelfMixin],
    computed: {
      defaultCategory() {
        return [
          {
            title: this.$t('shelf.newGroup'),
            edit: 1
          },
          {
            title: this.$t('shelf.groupOut'),
            edit: 2
          }
        ]
      },
      categoryList() {
        const list = this.shelfList ? this.shelfList.filter(item => item.type === 2) : []
        return [...this.defaultCategory, ...list]
      },
      dialogTitle () {
        if (this.selectGroupDialogVisible && this.newGroupDialogVisible) {
          return this.$t('shelf.moveBook')
        } else {
          return this.$t('shelf.newGroup')
        }
      },
      isInGroup(){
        return this.currentType === 2
      }
    },
    data() {
      return {
        newGroupDialogVisible: false,
        selectGroupDialogVisible: true,
        newGroupName: ''
      }
    },
    methods: {
      createNewGroup() {
        if (!this.newGroupName && this.newGroupName.length === 0) {
          return
        }
        if (this.showNewGroup) {
          this.shelfCategory.title = this.newGroupName
          this.onComplete()
        } else {
          const group = {
            id: this.bookList[this.bookList.length - 2].id + 1,
            itemList: [],
            selected: false,
            title: this.newGroupName,
            type: 2
          }
          let list = removeAddromShelf(this.shelfList)
          list.push(group)
          list = appendAddToShelf(list)
          this.setShelfList(list).then(() => {
            this.moveToGroup(group)
          });
        }

      },
      clear() {
        this.newGroupName = ''
      },
      onGroupClick(item) {
        if (item.edit && item.edit === 1) {
          // 新建分组
          this.showCreateGroupDialog()
        } else if (item.edit && item.edit === 2) {
          // 移出分组
          this.moveOutGroup()
        } else {
          // 移入分组
          this.moveToGroup()
        }
      },
      moveOutGroup() {
        this.moveOutOfGroup(this.onComplete)
      },
      moveToGroup(group) {
        this.setShelfList(this.shelfList.filter(book => {
          if (book.itemList) {
            book.itemList = book.itemList.filter(subBook => this.shelfSelected.indexOf(subBook) < 0)
          }
          return this.shelfSelected.indexOf(book) < 0
        }))
        .then(() => {
          if (group && group.itemList) {
            group.itemList = [...group.itemList,...this.shelfSelected]
          }
          group.itemList.forEach((item,index) => {
            item.id = index + 1
          })
          this.simpleToast(this.$t('shelf.moveBookInSuccess').replace('$1', group.title))
          this.onComplete()
        })
      },
      onComplete() {
        saveBookShelf(this.shelfList)
        this.hide()
        this.setIsEditMode(false)
      },
      showCreateGroupDialog() {
        this.newGroupDialogVisible = true
        this.selectGroupDialogVisible = false
        this.newGroupName = ''
        this.$nextTick(() => {
          this.$refs.dialogInput.focus()
        })
      },
      show() {
        this.newGroupDialogVisible = this.showNewGroup
        this.selectGroupDialogVisible = !this.showNewGroup
        this.newGroupName = this.groupName
        this.$refs.dialog.show()
      },
      hide() {
        this.$refs.dialog.hide()
        setTimeout(() => {
          this.newGroupDialogVisible = false
          this.selectGroupDialogVisible = true
        }, 200)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-group-dialog-bg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 120;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    font-size: px2rem(16);
    color: #333;
    @include center;
    .shelf-group-dialog-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 60%;
      max-height: 80%;
      background: white;
      border-radius: px2rem(10);
      .dialog-list-wrapper {
        font-size: px2rem(14);
        .dialog-list-item {
          display: flex;
          padding: px2rem(15) 0;
          box-sizing: border-box;
          color: #666;
          &.is-add {
            color: $color-blue;
            &:active {
              color: $color-blue-transparent;
            }
          }
          &:active {
            color: rgba(102, 102, 102, .5)
          }
          .dialog-list-item-text {
            flex: 1;
          }
          .dialog-list-icon-wrapper {
            flex: 0 0 px2rem(30);
            color: $color-blue;
            @include right;
          }
        }
      }
      .dialog-input-wrapper {
        width: 100%;
        padding: 0 0 px2rem(30) 0;
        box-sizing: border-box;
        .dialog-input-inner-wrapper {
          display: flex;
          width: 100%;
          padding: px2rem(10) 0;
          box-sizing: border-box;
          border-bottom: px2rem(1) solid #eee;
          font-size: px2rem(14);
          color: #666;
          .dialog-input {
            flex: 1;
            border: none;
            &:focus {
              outline: none;
            }
          }
          .dialog-input-clear-wrapper {
            flex: 0 0 px2rem(30);
            color: #ccc;
            @include center;
            &:active {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>

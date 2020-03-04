<template>
  <transition name="fade">
    <div class="dialog" v-if="visible">
      <div class="dialog-wrapper">
        <div class="dialog-title-wrapper">
          <div class="dialog-title-text">{{title}}</div>
        </div>
        <slot></slot>
        <div class="dialog-btn-wrapper">
          <slot name="btn">
            <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
            <div class="dialog-btn" @click="hide">{{$t('shelf.confirm')}}</div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    hide() {
      this.visible = false
    }
  }

}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global";
</style>

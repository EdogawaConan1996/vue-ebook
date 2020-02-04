<template>
  <transition name="fade">
    <div class="toast-bg" v-show="visbile">
      <div class="toast-wrapper">
        <div class="toast" v-html="text"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    text: {
      type: [String,Number]
    },
    timeout: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">

</style>

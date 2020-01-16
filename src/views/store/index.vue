<template>
  <div class="index">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  @import "../../assets/styles/global.scss";

  .index {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
  }
</style>
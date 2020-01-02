<template>
  <div id="app">
    ABCDEFG
    <router-view></router-view>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10 > 50 ? 50 : window.innerWidth / 10
  html.style.fontSize = `${fontSize}px`


})
export default {
  name: 'app'
}
</script>

<style>

</style>

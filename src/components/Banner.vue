<template>
  <div id="banner">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      title: 'Snake.js'
    }
  }
}
</script>

<style scoped>
#banner {
  position: absolute;
  top: 3vw;
  opacity: 0.7;
  color: #ff7400;
  font-size: 6vw;
}
</style>

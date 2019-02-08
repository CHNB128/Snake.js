<template>
  <div id="score">
    score: {{ score }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      score: 0
    }
  }
}
</script>

<style scoped>
#score {
  top: 3vw;
  opacity: 0.7;
  color: #ff7400;
}
</style>

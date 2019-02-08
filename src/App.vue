<template>
  <div id="app">
    <loader/>
    <banner/>
    <score-board/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Banner from '@/components/Banner'
import ScoreBoard from '@/components/ScoreBoard'

export default {
  name: 'App',
  components: {
    Banner,
    Loader,
    ScoreBoard
  },
  mounted () {
    window.addEventListener('load', () => {
      this.$store.commit('loader/hide')
      this.$store.dispatch('setup')
      this.$store.dispatch('run')
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
body, html, #app {
  width: 100%;
  height: 100%;
  margin: 0px;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
  font-family: 'Press Start 2P', cursive;
}
</style>

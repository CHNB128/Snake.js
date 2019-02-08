<template>
  <div id="loader" v-if="show">
    <spinner/>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { mapState } from 'vuex'

export default {
  components: {
    Spinner
  },
  computed: mapState('loader', {
    show: state => state.show
  })
}
</script>

<style scoped>
#loader {
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2;

  width: 100%;
  height: 100%;

  background-color: #000;
}
</style>

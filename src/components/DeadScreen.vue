<template>
  <div id="dead-screen" v-if="show">
    {{ title }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: 'DEAD'
    }
  },
  computed: mapState({
    show: state => state.deadScreen.show
  })
}
</script>

<style scoped>

</style>

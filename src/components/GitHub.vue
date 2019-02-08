<template>
  <div id="github-link" @click="onClick">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'GitHub link',
  data () {
    return {
      url: 'https://github.com/CHNB128/Snake.js',
      title: 'GitHub'
    }
  },
  methods: {
    onClick () { window.location = this.url }
  }
}
</script>

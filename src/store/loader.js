export default {
  namespaced: true,
  state: {
    show: false
  },
  mutations: {
    hide ({ show }) {
      show = false
    },
    show ({ show }) {
      show = true
    }
  }
}

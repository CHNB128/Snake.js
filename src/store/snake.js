import Vector2 from '../game/vector2'

export default {
  namespaced: true,
  state: {
    body: [],
    direction: {
      key: '',
      vector: new Vector2(1, 0)
    },
    color: 0x70ff0b
  },
  mutations: {
    init (state) {
      state.body = []

      for (let i = 0; i < 3; i++) {
        state.body.push(new Vector2(i, 0))
      }
    },
    applyDirection (state) {
      switch (state.direction) {
        case 'up':
          if (state.direction.vector.y !== 1) {
            state.direction.vector.y = -1
            state.direction.vector.x = 0
          }
          break
        case 'down':
          if (state.direction.vector.y !== -1) {
            state.direction.vector.y = 1
            state.direction.vector.x = 0
          }
          break
        case 'left':
          if (state.direction.vector.x !== 1) {
            state.direction.vector.x = -1
            state.direction.vector.y = 0
          }
          break
        case 'right':
          if (state.direction.vector.x !== -1) {
            state.direction.vector.x = 1
            state.direction.vector.y = 0
          }
          break
      }
    },
    increaseSize (state) {
      state.body.push(new Vector2(0, 0))
    }
  },
  actions: {
    update ({ dispatch, commit }) {
      commit('applyDirection')
      dispatch('move')
    },
    move ({ state, rootState }) {
      let last = state.body.pop()
      let first = state.body[0]
      last.x = first.x + state.direction.vector.x
      last.y = first.y + state.direction.vector.y

      // Return snake to the fild if it move away
      if (last.x > rootState.window.size.x / rootState.blockSize - 1) {
        last.x = 0
      }
      if (last.x < 0) {
        last.x = Math.floor(rootState.window.size.x / rootState.blockSize)
      }
      if (last.y > rootState.window.size.y / rootState.blockSize) {
        last.y = 0
      }
      if (last.y < 0) {
        last.y = Math.floor(rootState.window.size.y / rootState.blockSize)
      }

      state.body.unshift(last)
    },
  }
}

import Vue from 'vue'
import Vuex from 'vuex'

import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'
import Mousetrap from 'mousetrap'

import Vector2 from '../game/vector2'
import Block from '../game/Block'

import loader from './loader'
import snake from './snake'

Vue.use(Vuex)

function getWindowSize () {
  let w = window
  let d = document
  let e = d.documentElement
  let g = d.getElementsByTagName('body')[0]
  let x = w.innerWidth || e.clientWidth || g.clientWidth
  let y = w.innerHeight || e.clientHeight || g.clientHeight
  // PIXI.js specific
  x = x - 3
  return { x, y }
}

function randomRange (min, max) {
  return min + (Math.random() * ((max - min) + 1))
}

export default new Vuex.Store({
  modules: {
    loader,
    snake
  },
  state: {
    blockSize: 15,
    intervalSize: 45,
    window: {
      size: { width: null, height: null }
    },
    engine: null,
    graphics: null,
    snake: null,
    food: new Block(new Vector2(0, 0), 0xfff200),
    score: 0,
    obstacles: [],
    intervalId: null
  },
  mutations: {
    reset (state) {
      state.food.position = new Vector2(-5, -5)
      state.obstacles = []
      state.score = 0
    },
    setWindowSize (state) {
      let size = getWindowSize()
      state.window.size.height = size.height
      state.window.size.width = size.width
    },
    setupEngine (state) {
      state.engine = new PIXI.Application(
        state.window.size.width,
        state.window.size.height
      )
    },
    setupGraphics (state) {
      let graphics = new PIXI.Graphics()
      state.graphics = graphics
      state.engine.stage.addChild(graphics)
    },
    addObstacle (state, obstacle) {
      state.obstacles.push(obstacle)
    },
    setFoodPosition (state, position) {
      state.food.position = position
    },
    setIntervalId (state, id) {
      state.intervalId = id
    },
    increaseScore (state) {
      state.score += 1
    },
    stopGameLoop (state) {
      clearInterval(state.intervalId)
    }
  },
  actions: {
    run ({ commit, state, getters, dispatch }) {
      let intervalId

      commit('snake/init')
      commit('setFoodPosition', getters.getAvaliblePosition)
      dispatch('addObstacle')

      intervalId = setInterval(() => {
        state.graphics.clear()

        if (state.food.position.equal(state.snake.body[0])) {
          commit('increaseScore')
          commit('setFoodPosition', getters.getAvaliblePosition)
          commit('snake/increaseSize')
        }

        if (state.score / state.obstacles.length === 3) {
          dispatch('addObstacle')
        }

        state.snake.body.slice(1).map(e => {
          if (e.equal(state.snake.body[0])) {
            // ui.showDeadScreen()
            commit('stopGameLoop')
          }
        })

        state.obstacles.map(e => {
          if (e.position.equal(state.snake.body[0])) {
            // ui.showDeadScreen()
            commit('stopGameLoop')
          }
        })

        dispatch('snake/update')
        dispatch('draw')
      }, state.intervalSize)
      commit('setIntervalId', intervalId)
    },
    draw ({ state, dispatch }) {
      state.obstacles.map(e => {
        dispatch('drawRectangle', e)
      })
      state.snake.body.map(e => {
        dispatch('drawRectangle', {
          position: e,
          size: state.food.size,
          color: state.snake.color
        })
      })
      dispatch('drawRectangle', state.food)
    },
    addObstacle ({ getters, commit }) {
      let obstacle = new Block()
      obstacle.position = getters.getAvaliblePosition
      commit('addObstacle', obstacle)
    },
    setup ({ commit, state, dispatch, getters }) {
      commit('setWindowSize')
      commit('setupEngine')
      commit('setupGraphics')
      dispatch('setupController')

      document.appendChild(getters.canvas)
      window.addEventListener('resize', () => {
        state.engine.renderer.resize(
          window.innerWidth,
          window.innerHeight
        )
      })
    },
    drawRectangle ({ state }, { position, size, color }) {
      let graphics = state.graphics
      graphics.lineStyle(1, 0x000000, 1)
      graphics.beginFill(color, 1)
      graphics.drawRect(
        position.x * state.blockSize,
        position.y * state.blockSize,
        size.x,
        size.y
      )
    },
    setupController ({ state, getters }) {
      let hammer = new Hammer(getters.canvas)

      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

      hammer.on('swipe', e => {
        switch (e.direction) {
          case 2: // left
            state.snake.direction.key = 'left'
            break
          case 4: // right
            state.snake.direction.key = 'right'
            break
          case 8: // up
            state.snake.direction.key = 'up'
            break
          case 16: // down
            state.snake.direction.key = 'down'
            break
        }
      })

      Mousetrap.bind('up', () => {
        state.snake.direction.key = 'up'
      })
      Mousetrap.bind('down', () => {
        state.snake.direction.key = 'down'
      })
      Mousetrap.bind('left', () => {
        state.snake.direction.key = 'left'
      })
      Mousetrap.bind('right', () => {
        state.snake.direction.key = 'right'
      })
    }
  },
  getters: {
    canvas: state => {
      if (state.engine) {
        return state.engine.view
      } else {
        return null
      }
    },
    getAvaliblePosition: (state) => {
      let position
      do {
        position = new Vector2(
          Math.floor(randomRange(0, state.window.size.x / state.blockSize)),
          Math.floor(randomRange(0, state.window.size.y / state.blockSize))
        )
      } while (
        state.obstacles.filter(e => e.position.equal(position)).length !== 0 &&
        state.snake.body.filter(e => e.position.equal(position)).length !== 0 &&
        state.food.position.equal(position)
      )
      return position
    }
  }
})

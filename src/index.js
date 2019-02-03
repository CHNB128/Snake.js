import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'

import './loader'
import './array'
import './assets/main.css'

import UI from './ui'
import Loader from './loader'
import Game from './game'

const loader = new Loader()

function getWindowSize() {
  let w = window
  let d = document
  let e = d.documentElement
  let g = d.getElementsByTagName('body')[0]
  let x = w.innerWidth || e.clientWidth || g.clientWidth
  let y = w.innerHeight || e.clientHeight || g.clientHeight
  x = x - 3
  return { x, y }
}

window.size = getWindowSize()
window.app = new PIXI.Application(window.size.x, window.size.y)
window.ui = new UI()
window.graphics = new PIXI.Graphics()
window.blockSize = 15

window.hammer = new Hammer(app.view)
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

window.game = new Game()

app.stage.addChild(graphics)
game.bindKeyborad()
game.start()
loader.show()
ui.hideDeadScreen()

window.drawRectangle = function(position, size, color) {
  graphics.lineStyle(1, 0x000000, 1)
  graphics.beginFill(color, 1)
  graphics.drawRect(
    position.x * blockSize,
    position.y * blockSize,
    size.x,
    size.y
  )
}

window.addEventListener('resize', function() {
  window.size = getWindowSize()
  app.renderer.resize(window.innerWidth, window.innerHeight)
})

document.addEventListener('DOMContentLoaded', function(event) {
  setTimeout(() => {
    document.body.appendChild(app.view)
    ui.show()
    loader.hide()
  }, 1000)
})

import Snake from './snake'
import Food from './food'
import keyboard from './keyboard'

function Game() {
  this.snake = new Snake()
  this.food = new Food()
  this.score = 0
  this.scoreElement = document.getElementById('score')
  this.isKeyboardLock = false
  this.intervalId = null
}
Game.prototype.bindKeyborad = function() {
  const left = keyboard('ArrowLeft')
  const up = keyboard('ArrowUp')
  const right = keyboard('ArrowRight')
  const down = keyboard('ArrowDown')

  const all = [left, up, right, down]

  left.press = () => {
    // if (all.filter(e => e.isDown).length != 0) {
    //   return
    // }
    if (this.snake.direction.x != 1) {
      this.snake.direction.x = -1
      this.snake.direction.y = 0
    }
  }
  right.press = () => {
    // if (all.filter(e => e.isDown).length != 0) {
    //   return
    // }
    if (this.snake.direction.x != -1) {
      this.snake.direction.x = 1
      this.snake.direction.y = 0
    }
  }
  up.press = () => {
    // if (all.filter(e => e.isDown).length != 0) {
    //   return
    // }
    if (this.snake.direction.y != 1) {
      this.snake.direction.y = -1
      this.snake.direction.x = 0
    }
  }
  down.press = () => {
    // if (all.filter(e => e.isDown).length != 0) {
    //   return
    // }
    if (this.snake.direction.y != -1) {
      this.snake.direction.y = 1
      this.snake.direction.x = 0
    }
  }
}
Game.prototype.displayScore = function() {
  this.scoreElement.innerText = this.score
}
Game.prototype.start = function() {
  this.snake.init()
  this.food.create()
  this.displayScore()
  this.intervalId = setInterval(() => {
    graphics.clear()

    if (this.food.position.equal(this.snake.body.first())) {
      this.score++
      this.displayScore()
      this.food.create()
      this.snake.increaseSize()
    }

    this.snake.body.slice(1).map(e => {
      if (e.equal(this.snake.body.first())) {
        if (this.snake.body.length > 3) {
          ui.showDeadScreen()
          clearInterval(this.intervalId)
        }
      }
    })

    this.snake.update()

    this.food.draw()
    this.snake.draw()
  }, 30)
}

export default Game

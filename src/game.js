import Snake from './snake'
import Food from './food'
import Obstacle from './obstacle'
import keyboard from './keyboard'
import Vector2 from './vector2'

function Game() {
  this.snake = new Snake()
  this.food = new Food()
  this.score = 0
  this.scoreElement = document.getElementById('score')
  this.intervalId = null
  this.obstacles = []
}
Game.prototype.reset = function() {
  this.food.position = new Vector2(-5, -5)
  this.obstacles = []
  this.score = 0
  this.snake.init()
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
Game.prototype.createObject = function(object) {
  let position
  do {
    position = new Vector2(
      Math.round(Math.random() * (window.size.x / blockSize)),
      Math.round(Math.random() * (window.size.y / blockSize))
    )
  } while (
    this.obstacles.filter(e => e.position.equal(position)).length != 0 &&
    this.snake.body.filter(e => e.position.equal(position)).length != 0 &&
    this.food.position.equal(position)
  )
  object.create(position)
}
Game.prototype.start = function() {
  this.reset()

  this.snake.init()
  this.createObject(this.food)
  this.displayScore()

  let newObstacle = new Obstacle()
  this.createObject(newObstacle)
  this.obstacles.push(newObstacle)

  this.intervalId = setInterval(() => {
    graphics.clear()

    if (this.food.position.equal(this.snake.body.first())) {
      this.score++
      this.displayScore()
      this.createObject(this.food)
      this.snake.increaseSize()
    }

    if (this.score / this.obstacles.length == 5) {
      let newObstacle = new Obstacle()
      this.createObject(newObstacle)
      this.obstacles.push(newObstacle)
    }

    this.snake.body.slice(1).map(e => {
      if (e.equal(this.snake.body.first())) {
        if (this.snake.body.length > 3) {
          // hack
          ui.showDeadScreen()
          clearInterval(this.intervalId)
        }
      }
    })

    this.obstacles.map(e => {
      if (e.position.equal(this.snake.body.first())) {
        ui.showDeadScreen()
        clearInterval(this.intervalId)
      }
    })

    this.snake.update()

    this.obstacles.map(e => e.draw())
    this.food.draw()
    this.snake.draw()
  }, 30)
}

export default Game

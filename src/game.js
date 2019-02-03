import Snake from './snake'
import Food from './food'
import Obstacle from './obstacle'
import Vector2 from './vector2'

import Mousetrap from 'mousetrap'

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
}
Game.prototype.bindKeyborad = function() {
  hammer.on('swipe', e => {
    switch (e.direction) {
      case 2: // left
        this.snake.direction = 'left'
        break
      case 4: // right
        this.snake.direction = 'right'
        break
      case 8: // up
        this.snake.direction = 'up'
        break
      case 16: // down
        this.snake.direction = 'down'
        break
    }
  })

  Mousetrap.bind('up', () => (this.snake.direction = 'up'))
  Mousetrap.bind('down', () => (this.snake.direction = 'down'))
  Mousetrap.bind('left', () => (this.snake.direction = 'left'))
  Mousetrap.bind('right', () => (this.snake.direction = 'right'))
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

    if (this.score / this.obstacles.length == 3) {
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

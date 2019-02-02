import Vector2 from './vector2'

function Snake() {
  this.body = []
  this.direction = new Vector2(1, 0)
  this.color = 0x70ff0b
}
Snake.prototype.init = function() {
  for (let i = 0; i < 3; i++) {
    this.body.push(new Vector2(i, 0))
  }
}
Snake.prototype.draw = function() {
  this.body.map(e => {
    drawRectangle(e, new Vector2(blockSize, blockSize), this.color)
  })
}
Snake.prototype.update = function() {
  let last = this.body.pop()
  let first = this.body[0]
  last.x = first.x + this.direction.x
  last.y = first.y + this.direction.y

  // Return snake to the fild if it move away
  if (last.x > window.size.x / blockSize) {
    last.x = 0
  }
  if (last.x < 0) {
    last.x = Math.floor(window.size.x / blockSize)
  }
  if (last.y > window.size.y / blockSize) {
    last.y = 0
  }
  if (last.y < 0) {
    last.y = Math.floor(window.size.y / blockSize)
  }

  this.body.unshift(last)
}
Snake.prototype.increaseSize = function() {
  this.body.push(new Vector2(0, 0))
}

export default Snake
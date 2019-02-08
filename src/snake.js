import Vector2 from './vector2'

export default class Snake {
  constructor() {
    this.body = null
    this.direction = ''
    this.vectorDirection = new Vector2(1, 0)
    this.color = 0x70ff0b
  }

  init() {
    this.body = []
    for (let i = 0; i < 3; i++) {
      this.body.push(new Vector2(i, 0))
    }
  }

  draw() {
    this.body.map(e => {
      drawRectangle(e, new Vector2(blockSize, blockSize), this.color)
    })
  }

  applyDirection() {
    switch (this.direction) {
      case 'up':
        if (this.vectorDirection.y != 1) {
          this.vectorDirection.y = -1
          this.vectorDirection.x = 0
        }
        break
      case 'down':
        if (this.vectorDirection.y != -1) {
          this.vectorDirection.y = 1
          this.vectorDirection.x = 0
        }
        break
      case 'left':
        if (this.vectorDirection.x != 1) {
          this.vectorDirection.x = -1
          this.vectorDirection.y = 0
        }
        break
      case 'right':
        if (this.vectorDirection.x != -1) {
          this.vectorDirection.x = 1
          this.vectorDirection.y = 0
        }
        break
    }
  }

  moveHead() {
    let last = this.body.pop()
    let first = this.body[0]
    last.x = first.x + this.vectorDirection.x
    last.y = first.y + this.vectorDirection.y

    // Return snake to the fild if it move away
    if (last.x > window.size.x / blockSize - 1) {
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

  update() {
    this.applyDirection()
    this.moveHead()
  }

  increaseSize() {
    this.body.push(new Vector2(0, 0))
  }
}

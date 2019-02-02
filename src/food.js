import Vector2 from './vector2'

function Food() {
  this.position = null
  this.color = 0xfff200
}
Food.prototype.create = function() {
  this.position = new Vector2(
    Math.round(Math.random() * (window.size.x / blockSize)),
    Math.round(Math.random() * (window.size.y / blockSize))
  )
}
Food.prototype.draw = function() {
  drawRectangle(this.position, new Vector2(blockSize, blockSize), this.color)
}

export default Food

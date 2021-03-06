import Vector2 from './vector2'

function Food() {
  this.position = null
  this.color = 0xfff200
}
Food.prototype.create = function(position) {
  this.position = position
}
Food.prototype.draw = function() {
  drawRectangle(this.position, new Vector2(blockSize, blockSize), this.color)
}

export default Food

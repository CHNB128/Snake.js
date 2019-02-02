import Vector2 from './vector2'

function Obstacle() {
  this.position = null
  this.color = 0xff0000
}
Obstacle.prototype.create = function(position) {
  this.position = position
}
Obstacle.prototype.draw = function() {
  drawRectangle(this.position, new Vector2(blockSize, blockSize), this.color)
}

export default Obstacle

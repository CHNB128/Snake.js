function Vector2(x, y) {
  this.x = x
  this.y = y
}
Vector2.prototype.equal = function(vector2) {
  return this.x == vector2.x && this.y == vector2.y
}

export default Vector2

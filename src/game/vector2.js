export default class Vector2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  equal (vector2) {
    return this.x === vector2.x && this.y === vector2.y
  }
}

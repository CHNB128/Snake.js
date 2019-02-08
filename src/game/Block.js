import Vector2 from '../game/vector2'

export default class Block {
  constructor (position, size, color) {
    this.position = position
    this.size = new Vector2(15, 15)
    this.color = color
  }
}
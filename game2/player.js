import createShape from "./shape.js";

class Player {
  constructor(color) {
    this._id = Math.random()
  }

  get id() {
    return this._id
  }

  get shape() {
    return this._shape
  }

  set shape(shape) {
    shape.parent = this
    this._shape = shape
  }

}

export default function createPlayer(color) {
  let player = new Player()
  player.shape = createShape(player.id, 0, 0, 10, 10, color)
  return player
}

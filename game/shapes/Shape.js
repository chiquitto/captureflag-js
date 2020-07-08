export default class Shape {
  #color
  #x
  #y
  #width
  #height
  #id

  get color() {
    return this.#color
  }

  set color(value) {
    this.#color = value
  }

  get x() {
    return this.#x
  }

  get xEnd() {
    return this.#x + this.#width
  }

  set x(value) {
    this.#x = value
  }

  get y() {
    return this.#y
  }

  get yEnd() {
    return this.#y + this.#height
  }

  set y(value) {
    this.#y = value
  }

  get width() {
    return this.#width
  }

  set width(value) {
    this.#width = value
  }

  get height() {
    return this.#height
  }

  set height(value) {
    this.#height = value
  }

  get id() {
    return this.#id
  }

  set id(value) {
    this.#id = value
  }

  constructor(id, x, y, width, height, color) {
    this.#id = id
    this.#x = x
    this.#y = y
    this.#width = width
    this.#height = height

    this.#color = color || 'red'
  }

  /**
   *
   * @param {Shape} other
   * @returns {boolean}
   */
  equals(other) {
    return this.#id == other.id
  }

  /**
   * @link https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
   * @link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
   *
   * @param {Shape} other
   */
  detectCollision(other) {

    var rect1 = {x: this.x, y: this.y, width: this.width, height: this.height}
    var rect2 = {x: other.x, y: other.y, width: other.width, height: other.height}

    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      return true
    } else {
      return false
    }
  }
}

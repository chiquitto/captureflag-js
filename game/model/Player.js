import Polygon from "./Polygon.js";

class Player {
  #id
  #score = 0
  #color
  #polygon

  constructor(color, polygon) {
    this.#id = Math.random()
    this.#color = color
    this.#polygon = polygon
  }

  get color() {
    return this.#color
  }

  /**
   *
   * @param {Player} other
   * @returns {boolean}
   */
  equals(other) {
    return this.#id == other.id
  }

  get id() {
    return this.#id
  }

  /**
   *
   * @returns {Polygon}
   */
  get polygon() {
    return this.#polygon
  }

  get score() {
    return this.#score
  }

  set score(score) {
    this.#score = score
  }

}

/**
 *
 * @param {String} color
 * @param {Polygon|Rectangle} polygon
 * @returns {Player}
 */
export default function createPlayer(color, polygon) {
  return new Player(color, polygon)
}

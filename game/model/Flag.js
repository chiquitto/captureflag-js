import Polygon from "./Polygon.js";

/**
 * @property {String} color
 * @property {Polygon} polygon
 */
class Flag {
  #id
  #color
  #polygon

  constructor(polygon) {
    this.#id = Math.random()
    this.#color = 'green'
    this.#polygon = polygon
  }

  get color() {
    return this.#color
  }

  get id() {
    return this.#id
  }

  get polygon() {
    return this.#polygon
  }
}

/**
 *
 * @param {Polygon|Rectangle} polygon
 * @returns {Flag}
 */
export default function createFlag(polygon) {
  return new Flag(polygon)
}

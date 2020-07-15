import Polygon from "./Polygon.js";
import {randomString} from "../util.js";

/**
 * @property {String} color
 * @property {Polygon} polygon
 */
class Flag {
  #id
  #color
  #polygon
  #points

  constructor(points, color, polygon) {
    this.#points = points
    this.#polygon = polygon
    this.#color = color

    this.#id = randomString(32)
  }

  get color() {
    return this.#color
  }

  get id() {
    return this.#id
  }

  get points() {
    return this.#points
  }

  get polygon() {
    return this.#polygon
  }

  /**
   *
   * @param {Flag} other
   * @returns {boolean}
   */
  equals(other) {
    return this.#id == other.id
  }
}

/**
 *
 * @param {Number} points
 * @param {String} color
 * @param {Polygon|Rectangle} polygon
 * @returns {Flag}
 */
export default function createFlag(points, color, polygon) {
  return new Flag(points, color, polygon)
}

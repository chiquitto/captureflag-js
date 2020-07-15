import Polygon from "./Polygon.js";
import {randomString} from "../util.js";

class Player {
  #id
  #number
  #score
  #color
  #polygon

  /**
   *
   * @param {number} number
   * @param {String} color
   * @param {Polygon|Rectangle} polygon
   */
  constructor(number, color, polygon) {
    this.#number = number
    this.#color = color
    this.#polygon = polygon

    this.#id = randomString(32)
    this.#score = 0
  }

  /**
   *
   * @returns {string}
   */
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

  /**
   *
   * @returns {string}
   */
  get id() {
    return this.#id
  }

  /**
   *
   * @returns {number}
   */
  get number() {
    return this.#number
  }

  /**
   *
   * @returns {Polygon}
   */
  get polygon() {
    return this.#polygon
  }

  /**
   *
   * @returns {number}
   */
  get score() {
    return this.#score
  }

  /**
   *
   * @param {number} score
   */
  set score(score) {
    this.#score = score
  }

}

/**
 *
 * @param {number} number
 * @param {String} color
 * @param {Polygon|Rectangle} polygon
 * @returns {Player}
 */
export default function createPlayer(number, color, polygon) {
  return new Player(number, color, polygon)
}

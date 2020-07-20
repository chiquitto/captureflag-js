import Polygon from "./Polygon.js"
import {randomString} from "../util.js"
import GameConfig from "../GameConfig.js"
import createPlayerImgAvatar from "./PlayerImgAvatar.js"
import createPlayerColorAvatar from "./PlayerColorAvatar.js"
import PlayerAvatar from "./PlayerAvatar.js"

class Player {
  #id
  #number
  #score
  #color
  #name
  #polygon
  #specialPoints
  #gamepad
  #avatar
  #roundNumber
  #stepNumber

  /**
   *
   * @param {number} number
   * @param {string} name
   * @param {string} color
   * @param {Polygon|Rectangle} polygon
   * @param {Object} gamepad
   */
  constructor(number, name, color, polygon, gamepad) {
    this.#number = number
    this.#color = color
    this.#name = name
    this.#polygon = polygon
    this.#gamepad = gamepad

    this.#id = randomString(32)
    this.#score = 0
    this.#specialPoints = 0
    this.#roundNumber = 0
    this.#stepNumber = 0

    this.loadAvatar(gamepad)
  }

  loadAvatar(gamepad) {
    if ((typeof gamepad.avatar) !== "undefined") {
      this.#avatar = createPlayerImgAvatar(gamepad.avatar)
    } else {
      this.#avatar = createPlayerColorAvatar(gamepad.color)
    }
  }

  /**
   *
   * @returns {PlayerAvatar}
   */
  get avatar() {
    return this.#avatar
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
   * @returns {string}
   */
  get name() {
    return this.#name
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
   * @returns {Rectangle}
   */
  get polygon() {
    return this.#polygon
  }

  get gamepad() {
    return this.#gamepad
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

  /**
   *
   * @returns {number}
   */
  get specialPoints() {
    return this.#specialPoints
  }

  set specialPoints(value) {
    this.#specialPoints = Math.min(value, GameConfig.playerMaxSpecialPoints)
  }

  /**
   *
   * @returns {number}
   */
  get roundNumber() {
    return this.#roundNumber
  }

  /**
   *
   * @param {number} value
   */
  set roundNumber(value) {
    this.#roundNumber = value
  }

  /**
   *
   * @returns {number}
   */
  get stepNumber() {
    return this.#stepNumber
  }

  /**
   *
   * @param {number} value
   */
  set stepNumber(value) {
    this.#stepNumber = value
  }

}

/**
 *
 * @param {number} number
 * @param {string} name
 * @param {string} color
 * @param {Polygon|Rectangle} polygon
 * @param {Object} gamepad
 * @returns {Player}
 */
export default function createPlayer(number, name, color, polygon, gamepad) {
  return new Player(number, name, color, polygon, gamepad)
}

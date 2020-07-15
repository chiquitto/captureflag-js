export default class GameConfig {
  static #playerMaxSpecialPoints = 100

  /**
   *
   * @returns {number}
   */
  static get playerMaxSpecialPoints() {
    return this.#playerMaxSpecialPoints
  }

  /**
   *
   * @param {number} value
   */
  static set playerMaxSpecialPoints(value) {
    this.#playerMaxSpecialPoints = value
  }
}

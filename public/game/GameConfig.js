export default class GameConfig {
  static gameFps = 8

  static playerMaxSpecialPoints = 100
  static playerSize = 2
  static playerGainSpecial = 3
  static playerGainSpecialAt = 5
  static playerSteps = 1

  static flagSize = 1
  static maxFlags = 5

  static finishPlayerPoints = 50
  static finishPlayerTurns = 1000

  /**
   *
   * @returns {number}
   */
  static get playerMaxSpecialPoints() {
    return this.playerMaxSpecialPoints
  }

  /**
   *
   * @param {number} value
   */
  static set playerMaxSpecialPoints(value) {
    this.playerMaxSpecialPoints = value
  }
}

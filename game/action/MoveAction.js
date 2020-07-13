import Action from "./Action.js"

export default class MoveAction extends Action {

  #backupData
  #player

  /**
   *
   * @param {Stage} stage
   * @param {Player} player
   * @param {Flag[]} flags
   * @param {Player[]} players
   */
  apply({stage, player, flags, players}) {
    this.#player = player

    this.backup()
    this.subApply(player)

    if (!this.testResult(stage, player, players)) {
      this.rollback()
      throw new Error('Invalid position')
    }
  }

  backup() {
    this.#backupData = {
      x: this.#player.polygon.x,
      y: this.#player.polygon.y
    }
  }

  rollback() {
    this.#player.polygon.x = this.#backupData.x
    this.#player.polygon.y = this.#backupData.y
  }

  subApply() {
    throw new Error('MoveAction.subApply not implemented')
  }

  /**
   *
   * @param {Stage} stage
   * @param {Player} player
   * @param {Player[]} players
   * @returns {boolean}
   */
  testResult(stage, player, players) {
    if (!stage.isContained(player.polygon)) {
      return false
    }

    for (let aux of players) {
      if (player.equals(aux)) {
        continue
      }

      //if (shapePlayer.detectCollision(aux)) {
      //  return false
      //}
    }
    return true
  }
}

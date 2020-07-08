import Action from "./Action.js"

export default class MoveAction extends Action {

  #backupData
  #player

  /**
   *
   * @param {Player} player
   */
  apply({player}) {
    this.#player = player

    this.backup()
    this.subApply(player)
    if (!this.testResult()) {
      this.rollback()
    }
  }

  backup() {
    this.#backupData = {
      x: this.#player.shape.x,
      y: this.#player.shape.y
    }
  }

  rollback() {
    this.#player.shape.x = this.#backupData.x
    this.#player.shape.y = this.#backupData.y
  }

  subApply() {
    throw new Error('MoveAction.subApply not implemented')
  }

  testResult() {
    let isOK = true

    return isOK
  }
}

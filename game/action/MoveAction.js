import Action from "./Action.js"
import {PlayerShape} from "../shapes/PlayerShape.js";

export default class MoveAction extends Action {

  #backupData
  #player

  /**
   *
   * @param {Stage} stage
   * @param {Shape[]} shapes
   * @param {Player} player
   */
  apply(stage, shapes, player) {
    this.#player = player

    this.backup()
    this.subApply(player)
    if (!this.testResult(stage, shapes)) {
      this.rollback()
      throw new Error('Invalid position')
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

  /**
   *
   * @param {Stage} stage
   * @param {Shape[]} shapes
   * @returns {boolean}
   */
  testResult(stage, shapes) {
    const shapePlayer = this.#player.shape

    if (!stage.isContained(shapePlayer)) {
      return false
    }

    for (let shape of shapes) {
      if (!(shape instanceof PlayerShape)) {
        continue
      }
      if (shapePlayer.equals(shape)) {
        continue
      }

      if (shapePlayer.detectCollision(shape)) {
        return false
      }
    }
    return true
  }
}

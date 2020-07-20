import Action from "./Action.js"
import InvalidCallSpecialError from "../exceptions/InvalidCallSpecialError.js"

export default class Special extends Action {

  subApply(gameState) {
    gameState.roundState.player.specialPoints -= this.cost
  }

  testBeforeApply(gameState) {
    if (gameState.roundState.player.specialPoints < this.cost) {
      throw new InvalidCallSpecialError(`InvalidCallSpecialError ${this.constructor.name}`)
    }
  }

  /**
   *
   * @returns {number}
   */
  get cost() {
    throw new Error('Special.cost not implemented')
  }

}

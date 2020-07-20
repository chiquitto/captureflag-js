import Action from "./Action.js"
import InvalidCallSpecialError from "../exceptions/InvalidCallSpecialError.js"

export default class Special extends Action {

  subApply(args) {
    args.player.specialPoints -= this.cost
  }

  testBeforeApply(args) {
    if (args.player.specialPoints < this.cost) {
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

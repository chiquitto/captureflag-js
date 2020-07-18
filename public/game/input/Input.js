export class Input {

  // #publicData

  /**
   *
   * @param {Player} player
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(player, publicData) {
    // this.#publicData = publicData
    return player.robot.action(publicData)
  }

  /**
   *
   * @returns {Object}
   */
  //get publicData() {
  //  return this.#publicData
  //}

}

/**
 *
 * @returns {Input}
 */
export default function createInput() {
  return new Input()
}

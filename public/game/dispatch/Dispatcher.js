export class Dispatcher {

  /**
   *
   * @param {Player} player
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(player, publicData) {
    return player.robot.action(publicData, null)
  }

}

/**
 *
 * @returns {Dispatcher}
 */
export default function createDispatcher() {
  return new Dispatcher()
}

import {Dispatcher} from "./Dispatcher.js";

export class PromiseDispatcher extends Dispatcher {

  #promiseResolve

  /**
   *
   * @param {Player} player
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(player, publicData) {
    return new Promise((resolve, reject) => {
      this.#promiseResolve = gameEvent => {
        return resolve(player.robot.action(publicData, gameEvent.toPlainObject()))
      }
    })
  }

  /**
   *
   * @param {GameEvent} gameEvent
   */
  resolve(gameEvent) {
    if (this.#promiseResolve == null) {
      return
    }

    this.#promiseResolve(gameEvent)
    this.#promiseResolve = null
  }

}

/**
 *
 * @returns {Dispatcher}
 */
export default function createPromiseDispatcher() {
  return new PromiseDispatcher()
}

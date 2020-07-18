import {Dispatcher} from "./Dispatcher.js"

export class PromiseDispatcher extends Dispatcher {

  #promiseResolve
  #publicData
  #player

  /**
   *
   * @param {Player} player
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(player, publicData) {
    this.#player = player
    this.#publicData = publicData

    return new Promise((resolve, reject) => {
      this.#promiseResolve = action => {
        return resolve(action)
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

    let action = this.#player.gamepad.action(this.#publicData, gameEvent.toPlainObject())
    if (action == null) {
      return
    }

    this.#promiseResolve(action)
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

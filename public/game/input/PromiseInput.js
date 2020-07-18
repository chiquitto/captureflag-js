import {Input} from "./Input.js";

export class PromiseInput extends Input {

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
      this.#promiseResolve = () => {
        return resolve(player.robot.action(publicData))
      }
    })
  }

  resolve() {
    if (this.#promiseResolve == null) {
      return
    }

    this.#promiseResolve()
    this.#promiseResolve = null
  }

}

/**
 *
 * @returns {Input}
 */
export default function createPromiseInput() {
  return new PromiseInput()
}

import MoveUpAction from "../action/MoveUpAction.js";
import MoveLeftAction from "../action/MoveLeftAction.js";
import MoveRightAction from "../action/MoveRightAction.js";
import MoveDownAction from "../action/MoveDownAction.js";
import Input from "./Input.js";

export default class PromiseInput extends Input {

  #promiseResolve

  /**
   *
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(publicData) {
    super.captureAction(publicData)

    return new Promise((resolve, reject) => {
      this.#promiseResolve = resolve
    })
  }

  triggerAction(action) {
    if (this.#promiseResolve == null) {
      return
    }

    this.#promiseResolve(action)
    this.#promiseResolve = null
  }

  /**
   *
   * @param {String} action
   */
  triggerActionString(action) {
    switch (action) {
      case 'UP':
        this.triggerUp()
        break
      case 'DOWN':
        this.triggerDown()
        break
      case 'LEFT':
        this.triggerLeft()
        break
      case 'RIGHT':
        this.triggerRight()
        break
    }
  }

  triggerLeft() {
    this.triggerAction(new MoveLeftAction())
  }

  triggerRight() {
    this.triggerAction(new MoveRightAction())
  }

  triggerUp() {
    this.triggerAction(new MoveUpAction())
  }

  triggerDown() {
    this.triggerAction(new MoveDownAction())
  }

}

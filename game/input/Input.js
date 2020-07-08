import MoveUpAction from "../action/MoveUpAction.js";
import MoveLeftAction from "../action/MoveLeftAction.js";
import MoveRightAction from "../action/MoveRightAction.js";
import MoveDownAction from "../action/MoveDownAction.js";

export default class Input {

  #promiseResolve

  /**
   *
   * @returns {Promise<Action>}
   */
  captureAction() {
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

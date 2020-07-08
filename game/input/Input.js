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
    this.triggerAction('left')
  }

  triggerRight() {
    this.triggerAction('right')
  }

  triggerUp() {
    this.triggerAction('up')
  }

  triggerDown() {
    this.triggerAction('down')
  }

}

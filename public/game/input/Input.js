export default class Input {

  #publicData

  /**
   *
   * @param {Object} publicData
   * @param {number} publicData.playerNumber
   * @returns {(Action|Promise<Action>)}
   */
  captureAction(publicData) {
    this.#publicData = publicData

    return null
  }

  /**
   *
   * @returns {Object}
   */
  get publicData() {
    return this.#publicData
  }

}

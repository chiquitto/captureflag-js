export default class RoundState {
  #player
  #playerNumber
  #stepSize
  #stepsLeft
  #stepsPassed

  /**
   *
   * @returns {Player}
   */
  get player() {
    return this.#player;
  }

  set player(value) {
    this.#player = value;
  }

  /**
   *
   * @returns {number}
   */
  get playerNumber() {
    return this.#playerNumber;
  }

  set playerNumber(value) {
    this.#playerNumber = value;
  }

  /**
   *
   * @returns {number}
   */
  get stepSize() {
    return this.#stepSize;
  }

  set stepSize(value) {
    this.#stepSize = value;
  }

  /**
   *
   * @returns {number}
   */
  get stepsLeft() {
    return this.#stepsLeft
  }

  /**
   *
   * @param {number} value
   */
  set stepsLeft(value) {
    this.#stepsLeft = value
  }

  /**
   *
   * @returns {number}
   */
  get stepsPassed() {
    return this.#stepsPassed
  }

  /**
   *
   * @param {number} value
   */
  set stepsPassed(value) {
    this.#stepsPassed = value
  }

}

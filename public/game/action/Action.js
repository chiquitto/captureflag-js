export default class Action {

  #gamepadArgs

  constructor(gamepadArgs) {
    this.#gamepadArgs = gamepadArgs
  }

  get gamepadArgs() {
    return this.#gamepadArgs
  }

  /**
   *
   * @param {GameState} gameState
   */
  apply(gameState) {
    this.testBeforeApply(gameState)
    this.subApply(gameState)
  }

  /**
   *
   * @param {GameState} gameState
   */

  applyAfter(gameState) {
  }

  /**
   *
   * @param {GameState} gameState
   */
  subApply(gameState) {
    throw new Error('Action.subApply not implemented')
  }

  /**
   *
   * @param {GameState} gameState
   */
  testBeforeApply(gameState) {
    throw new Error('Action.testBeforeApply not implemented')
  }

}

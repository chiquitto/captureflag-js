export default class Action {

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
  subApply(gameState) {
    throw new Error('Action.subApply not implemented')
  }

  /**
   *
   * @param {GameState} args
   */
  testBeforeApply(gameState) {
    throw new Error('Action.testBeforeApply not implemented')
  }

}

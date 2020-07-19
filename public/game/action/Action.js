/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} ActionArgs
 * @property {Stage} stage - The stage of game
 * @property {Player} player
 * @property {Flag[]} flags
 * @property {Player[]} players
 * @property {Object} options
 * @property {number} options.stepSize
 */
export default class Action {

  /**
   *
   * @param {ActionArgs} args
   */
  apply(args) {
    this.testBeforeApply(args)
    this.subApply(args)
  }

  /**
   *
   * @param {ActionArgs} args
   */
  subApply(args) {
    throw new Error('Action.subApply not implemented')
  }

  /**
   *
   * @param {ActionArgs} args
   */
  testBeforeApply(args) {
    throw new Error('Action.testBeforeApply not implemented')
  }

}

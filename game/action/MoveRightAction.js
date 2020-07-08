import MoveAction from "./MoveAction.js";

export default class MoveRightAction extends MoveAction {

  /**
   *
   * @param {Player} player
   */
  subApply(player) {
    player.shape.x++
  }
}

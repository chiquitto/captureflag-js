import MoveAction from "./MoveAction.js";

export default class MoveUpAction extends MoveAction {

  /**
   *
   * @param {Player} player
   */
  subApply(player) {
    player.shape.y--
  }
}

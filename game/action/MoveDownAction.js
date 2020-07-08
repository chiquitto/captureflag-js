import MoveAction from "./MoveAction.js";

export default class MoveDownAction extends MoveAction {

  /**
   *
   * @param {Player} player
   */
  subApply(player) {
    player.shape.y++
  }
}

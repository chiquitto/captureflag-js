import MoveAction from "./MoveAction.js";

export default class MoveLeftAction extends MoveAction {

  /**
   *
   * @param {Player} player
   */
  subApply(player) {
    player.polygon.x--
  }
}

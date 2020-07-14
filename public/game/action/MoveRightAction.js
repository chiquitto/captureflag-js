import MoveAction from "./MoveAction.js";

export default class MoveRightAction extends MoveAction {

  subApply(player, options) {
    player.polygon.x += options.stepSize
  }
}

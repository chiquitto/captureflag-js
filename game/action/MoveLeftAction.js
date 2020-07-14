import MoveAction from "./MoveAction.js";

export default class MoveLeftAction extends MoveAction {

  subApply(player, options) {
    player.polygon.x -= options.stepSize
  }
}

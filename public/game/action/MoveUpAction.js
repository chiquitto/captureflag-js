import MoveAction from "./MoveAction.js";

export default class MoveUpAction extends MoveAction {

  subApply(player, options) {
    player.polygon.y -= options.stepSize
  }
}

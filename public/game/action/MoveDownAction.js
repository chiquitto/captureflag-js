import MoveAction from "./MoveAction.js";

export default class MoveDownAction extends MoveAction {

  subApply(player, options) {
    player.polygon.y += options.stepSize
  }
}

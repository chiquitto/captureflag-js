import MoveAction from "./MoveAction.js"

export default class MoveLeftAction extends MoveAction {

  move(rectangle, args) {
    rectangle.x -= args.options.stepSize
  }

}

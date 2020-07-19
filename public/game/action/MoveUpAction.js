import MoveAction from "./MoveAction.js"

export default class MoveUpAction extends MoveAction {

  move(rectangle, args) {
    rectangle.y -= args.options.stepSize
  }

}

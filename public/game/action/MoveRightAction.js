import MoveAction from "./MoveAction.js"

export default class MoveRightAction extends MoveAction {

  move(rectangle, args) {
    rectangle.x += args.options.stepSize
  }

}

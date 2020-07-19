import MoveAction from "./MoveAction.js"

export default class MoveDownAction extends MoveAction {

  move(rectangle, args) {
    rectangle.y += args.options.stepSize
  }

}

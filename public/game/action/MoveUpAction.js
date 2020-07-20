import MoveAction from "./MoveAction.js"

export default class MoveUpAction extends MoveAction {

  move(rectangle, gameState) {
    rectangle.y -= gameState.roundState.stepSize
  }

}

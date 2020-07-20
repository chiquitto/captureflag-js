import MoveAction from "./MoveAction.js"

export default class MoveLeftAction extends MoveAction {

  move(rectangle, gameState) {
    rectangle.x -= gameState.roundState.stepSize
  }

}

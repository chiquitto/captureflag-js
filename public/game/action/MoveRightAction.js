import MoveAction from "./MoveAction.js"

export default class MoveRightAction extends MoveAction {

  move(rectangle, gameState) {
    rectangle.x += gameState.roundState.stepSize
  }

}

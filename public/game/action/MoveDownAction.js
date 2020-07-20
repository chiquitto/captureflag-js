import MoveAction from "./MoveAction.js"

export default class MoveDownAction extends MoveAction {

  move(rectangle, gameState) {
    rectangle.y += gameState.roundState.stepSize
  }

}

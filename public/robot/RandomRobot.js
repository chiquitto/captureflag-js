import MoveLeftAction from "../game/action/MoveLeftAction.js";
import MoveUpAction from "../game/action/MoveUpAction.js";
import MoveRightAction from "../game/action/MoveRightAction.js";
import MoveDownAction from "../game/action/MoveDownAction.js";

export default class RandomRobot {

  action(publicData) {
    const random = Math.floor(Math.random() * 4)
    switch (random) {
      case 0:
        return new MoveUpAction()
      case 1:
        return new MoveRightAction()
      case 2:
        return new MoveDownAction()
      default:
        return new MoveLeftAction()
    }
  }

}

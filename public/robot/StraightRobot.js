import MoveRightAction from "../game/action/MoveRightAction.js";
import MoveLeftAction from "../game/action/MoveLeftAction.js";
import MoveDownAction from "../game/action/MoveDownAction.js";
import MoveUpAction from "../game/action/MoveUpAction.js";

export default class StraightRobot {

  action(publicData) {
    const flag = publicData.flags[0]
    const player = publicData.player

    let flagDistance = this.calcFlagDistance(player, flag)

    if (flagDistance.x > 0) {
      return new MoveLeftAction()
    } else if (flagDistance.x < -10) {
      return new MoveRightAction()
    } else if (flagDistance.y > 0) {
      return new MoveUpAction()
    } else if (flagDistance.y < -10) {
      return new MoveDownAction()
    }

    return null
  }

  calcFlagDistance(player, flag) {
    const x = player.x - flag.x
    const y = player.y - flag.y
    const total = Math.abs(x) + Math.abs(y)

    return {x, y, total}
  }

}

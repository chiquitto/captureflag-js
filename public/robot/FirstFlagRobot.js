import MoveRightAction from "../game/action/MoveRightAction.js";
import MoveLeftAction from "../game/action/MoveLeftAction.js";
import MoveDownAction from "../game/action/MoveDownAction.js";
import MoveUpAction from "../game/action/MoveUpAction.js";

export default class FirstFlagRobot {

  action(publicData) {
    const flag = publicData.flags[0]
    const player = publicData.player

    let flagDistance = this.calcFlagDistance(player, flag)
    const diffX = -(player.width - publicData.game.stepSize)
    const diffY = -(player.height - publicData.game.stepSize)

    if (flagDistance.x > 0) {
      return new MoveLeftAction()
    } else if (flagDistance.x < diffX) {
      return new MoveRightAction()
    } else if (flagDistance.y > 0) {
      return new MoveUpAction()
    } else if (flagDistance.y < diffY) {
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

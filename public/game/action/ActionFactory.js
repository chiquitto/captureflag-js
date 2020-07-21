import MoveUpAction from "./MoveUpAction.js"
import MoveDownAction from "./MoveDownAction.js"
import MoveLeftAction from "./MoveLeftAction.js"
import MoveRightAction from "./MoveRightAction.js"
import createTwoStepsSpecial from "./TwoStepsSpecial.js"
import createThreeStepsSpecial from "./ThreeStepsSpecial.js"
import createRemoveFlagSpecial from "./RemoveFlagSpecial.js"
import createConvertToSpecialFlag from "./ConvertToSpecialFlag.js"

export default class ActionFactory {

  static factory(gamepadArgs) {
    if ((!(gamepadArgs instanceof Object)) || (!gamepadArgs.hasOwnProperty('type'))) {
      return null
    }

    switch (gamepadArgs.type) {
      case 'ConvertToSpecialFlag':
        return createConvertToSpecialFlag(gamepadArgs)
      case 'RemoveFlagSpecial':
        return createRemoveFlagSpecial(gamepadArgs)
      case 'TwoStepsSpecial':
        return createTwoStepsSpecial(gamepadArgs)
      case 'ThreeStepsSpecial':
        return createThreeStepsSpecial(gamepadArgs)
      case 'UP':
        return new MoveUpAction(gamepadArgs)
      case 'RIGHT':
        return new MoveRightAction(gamepadArgs)
      case 'DOWN':
        return new MoveDownAction(gamepadArgs)
      case 'LEFT':
        return new MoveLeftAction(gamepadArgs)
    }

    return null
  }

}

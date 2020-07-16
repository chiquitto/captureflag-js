import MoveUpAction from "./MoveUpAction.js";
import MoveDownAction from "./MoveDownAction.js";
import MoveLeftAction from "./MoveLeftAction.js";
import MoveRightAction from "./MoveRightAction.js";

export default class ActionFactory {

  static factory(args) {
    if ((!(args instanceof Object)) || (!args.hasOwnProperty('type'))) {
      return null
    }

    switch (args.type) {
      case 'UP':
        return new MoveUpAction(args)
      case 'RIGHT':
        return new MoveRightAction(args)
      case 'DOWN':
        return new MoveDownAction(args)
      case 'LEFT':
        return new MoveLeftAction(args)
    }

    return null
  }

}

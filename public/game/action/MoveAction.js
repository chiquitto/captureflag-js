import Action from "./Action.js"

export default class MoveAction extends Action {

  /**
   *
   * @param {Rectangle} polygon
   * @param {ActionArgs} args
   */
  move(rectangle, args) {
    throw new Error('MoveAction.move not implemented')
  }

  subApply(args) {
    this.move(args.player.polygon, args)
  }

  testBeforeApply(args) {
    let rectangle = args.player.polygon.copy()
    this.move(rectangle, args)

    if (!args.stage.isContained(rectangle)) {
      throw new Error('Invalid action: Player is outside stage')
    }

    for (let aux of args.players) {
      if (args.player.equals(aux)) {
        continue
      }

      if (rectangle.detectCollision(aux.polygon)) {
        throw new Error('Invalid action: Player collision')
      }
    }
  }

}

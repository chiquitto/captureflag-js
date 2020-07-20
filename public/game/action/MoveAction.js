import Action from "./Action.js"

export default class MoveAction extends Action {

  /**
   *
   * @param {Rectangle} rectangle
   * @param {GameState} gameState
   */
  move(rectangle, gameState) {
    throw new Error('MoveAction.move not implemented')
  }

  subApply(gameState) {
    this.move(gameState.roundState.player.polygon, gameState)
  }

  testBeforeApply(gameState) {
    let rectangle = gameState.roundState.player.polygon.copy()
    this.move(rectangle, gameState)

    if (!gameState.stage.isContained(rectangle)) {
      throw new Error('Invalid action: Player is outside stage')
    }

    for (let aux of gameState.players) {
      if (gameState.roundState.player.equals(aux)) {
        continue
      }

      if (rectangle.detectCollision(aux.polygon)) {
        throw new Error('Invalid action: Player collision')
      }
    }
  }

}

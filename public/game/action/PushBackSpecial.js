import Special from "./Special.js"
import InvalidPlayerError from "../exceptions/InvalidPlayerError.js"

class PushBackSpecial extends Special {

  /**
   *
   * @param {GameState} gameState
   */
  subApply(gameState) {
    super.subApply(gameState)

    let player = gameState.roundState.player
    let enemy = gameState.players[this.gamepadArgs.number]
    let distance = this.calcFlagDistance(player, enemy)

    enemy.polygon.x += (distance.x > 0) ? -this.push : this.push
    enemy.polygon.x = Math.min(Math.max(enemy.polygon.x, 0), gameState.stageWidth - enemy.polygon.width)

    enemy.polygon.y += (distance.y > 0) ? -this.push : this.push
    enemy.polygon.y = Math.min(Math.max(enemy.polygon.y, 0), gameState.stageHeight - enemy.polygon.height)
  }

  testBeforeApply(gameState) {
    super.testBeforeApply(gameState)

    let enemy = gameState.players[this.gamepadArgs.number]
    let player = gameState.roundState.player

    if (enemy.equals(player)) {
      throw new InvalidPlayerError('Enemy and Player must be different')
    }
  }

  get cost() {
    return this.push * 5
  }

  get push() {
    return this.gamepadArgs.push
  }

  calcFlagDistance(player, enemy) {
    const x = player.polygon.x - enemy.polygon.x
    const y = player.polygon.y - enemy.polygon.y
    const total = Math.abs(x) + Math.abs(y)

    return {x, y, total}
  }

}

/**
 *
 * @returns {PushBackSpecial}
 */
export default function createPushBackSpecial(gamepadArgs) {
  return new PushBackSpecial(gamepadArgs)
}

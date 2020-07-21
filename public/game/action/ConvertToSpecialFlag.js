import Special from "./Special.js"

class ConvertToSpecialFlag extends Special {

  subApply(gameState) {
    super.subApply(gameState)

    const oldFlag = gameState.flags[this.gamepadArgs.number]

    gameState.removeFlag(this.gamepadArgs.number)
    gameState.addSpecialFlag(oldFlag.polygon)
  }

  get cost() {
    return 50
  }

}

/**
 *
 * @returns {RemoveFlagSpecial}
 */
export default function createConvertToSpecialFlag(gamepadArgs) {
  return new ConvertToSpecialFlag(gamepadArgs)
}

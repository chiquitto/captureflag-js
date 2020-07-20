import Special from "./Special.js"

class RemoveFlagSpecial extends Special {

  subApply(gameState) {
    super.subApply(gameState)

    gameState.removeFlag(this.gamepadArgs.number)
    gameState.addFlag()
  }

  get cost() {
    return 30
  }

}

/**
 *
 * @returns {RemoveFlagSpecial}
 */
export default function createRemoveFlagSpecial(gamepadArgs) {
  return new RemoveFlagSpecial(gamepadArgs)
}

import Special from "./Special.js"

class ThreeStepsSpecial extends Special {

  subApply(gameState) {
    super.subApply(gameState)

    gameState.roundState.stepsLeft += 3
  }

  get cost() {
    return 25
  }

}

/**
 *
 * @returns {TwoStepsSpecial}
 */
export default function createThreeStepsSpecial() {
  return new ThreeStepsSpecial()
}

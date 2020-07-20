import Special from "./Special.js"

class TwoStepsSpecial extends Special {

  subApply(gameState) {
    super.subApply(gameState)

    gameState.roundState.stepsLeft += 2
  }

  get cost() {
    return 15
  }

}

/**
 *
 * @returns {TwoStepsSpecial}
 */
export default function createTwoStepsSpecial() {
  return new TwoStepsSpecial()
}

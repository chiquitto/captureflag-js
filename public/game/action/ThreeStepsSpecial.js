import Special from "./Special.js"

class ThreeStepsSpecial extends Special {

  subApply(args) {
    super.subApply(args);

    args.playerTurn.stepsLeft += 3
  }

  get cost() {
    return 25
  }

}

/**
 *
 * @param {Player} player
 * @returns {TwoStepsSpecial}
 */
export default function createThreeStepsSpecial(player) {
  return new ThreeStepsSpecial(player)
}

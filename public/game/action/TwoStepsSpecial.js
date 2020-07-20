import Special from "./Special.js"

class TwoStepsSpecial extends Special {

  subApply(args) {
    super.subApply(args);

    args.playerTurn.stepsLeft += 2
  }

  get cost() {
    return 15
  }

}

/**
 *
 * @param {Player} player
 * @returns {TwoStepsSpecial}
 */
export default function createTwoStepsSpecial(player) {
  return new TwoStepsSpecial(player)
}

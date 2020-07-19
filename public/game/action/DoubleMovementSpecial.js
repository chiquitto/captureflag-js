import Special from "./Special.js"

class DoubleMovementSpecial extends Special {

  get cost() {
    return 5
  }

}

/**
 *
 * @param {Player} player
 * @returns {DoubleMovementSpecial}
 */
export default function createDoubleMovementSpecial(player) {
  return new DoubleMovementSpecial(player)
}

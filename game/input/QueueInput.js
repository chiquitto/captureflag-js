import Input from "./Input.js";

class QueueInput extends Input {

  #playerQueue
  #playerQueueI

  /**
   *
   * @param {[String[]]} playerQueue
   */
  constructor(playerQueue) {
    super()

    this.#playerQueue = playerQueue
    this.#playerQueueI = Array.from(
      {length: playerQueue.length},
      _ => 0)
  }

  generateAction() {
    const playerNumber = this.publicData.playerNumber

    let pos = this.#playerQueueI[playerNumber]++
    let queueLength = this.#playerQueue[playerNumber].length

    this.triggerActionString(
      this.#playerQueue[playerNumber][pos % queueLength])
  }
}

/**
 *
 * @param {HTMLElement} element
 * @param {...String[]} playerQueue
 * @returns {QueueDomInput}
 */
export default function createDomQueueInput(element, ...playerQueue) {
  let input = new QueueInput(playerQueue)

  element.addEventListener('click', () => {
    input.generateAction()
  })

  return input
}

import PromiseInput from "./PromiseInput.js";

class DomInput extends PromiseInput {

  addTriggerLeft(eventType, idElement) {
    document.getElementById(idElement)
      .addEventListener(eventType, () => {
        this.triggerLeft()
      })
  }

  addTriggerRight(eventType, idElement) {
    document.getElementById(idElement)
      .addEventListener(eventType, () => {
        this.triggerRight()
      })
  }

  addTriggerUp(eventType, idElement) {
    document.getElementById(idElement)
      .addEventListener(eventType, () => {
        this.triggerUp()
      })
  }

  addTriggerDown(eventType, idElement) {
    document.getElementById(idElement)
      .addEventListener(eventType, () => {
        this.triggerDown()
      })
  }

}

/**
 *
 * @param {string} idLeft
 * @param {string} idRight
 * @param {string} idUp
 * @param {string} idDown
 * @returns {DomInput}
 */
export default function createDomClickInput(idLeft, idRight, idUp, idDown) {
  let input = new DomInput(idLeft, idRight, idUp, idDown)
  input.addTriggerLeft('click', idLeft)
  input.addTriggerRight('click', idRight)
  input.addTriggerUp('click', idUp)
  input.addTriggerDown('click', idDown)
  return input
}

import Input from "./Input.js";

class DomInput extends Input {

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
 * @param {String} idLeft
 * @param {String} idRight
 * @param {String} idUp
 * @param {String} idDown
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

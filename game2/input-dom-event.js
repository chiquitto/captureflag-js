import Input from "./input.js"

export default function createDomClickInput(idLeft, idRight, idUp, idDown) {
  let input = new DomEventInput(idLeft, idRight, idUp, idDown)
  input.addTriggerLeft('click', idLeft)
  input.addTriggerRight('click', idRight)
  input.addTriggerUp('click', idUp)
  input.addTriggerDown('click', idDown)
  return input
}

class DomEventInput extends Input {
  constructor(idLeft, idRight, idUp, idDown) {
    super()
  }

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

import PromiseInput from "./PromiseInput.js";

class PromiseRobotInput extends PromiseInput {

  #robots

  constructor(robots) {
    super();

    this.#robots = robots
  }

  generateAction() {
    const playerNumber = this.publicData.player.number

    const action = this.#robots[playerNumber]
      .action(this.publicData)

    super.triggerAction(action)
  }

}

export default function createPromiseRobotInput(element, robots) {

  // test robots
  for (let robot of robots) {
    if ((typeof robot.action) !== "function") {
      throw new Error('Invalid robot value')
      return null
    }
  }

  const input = new PromiseRobotInput(robots)

  element.addEventListener('click', () => {
    input.generateAction()
  })
  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      input.generateAction()
    }
  }

  return input
}

import Input from "./Input.js";

class RobotInput extends Input {

  #robots

  constructor(robots) {
    super();

    this.#robots = robots
  }

  captureAction(publicData) {
    const playerNumber = publicData.player.number

    return this.#robots[playerNumber]
      .action(publicData)
  }

}

export default function createRobotInput(robots) {

  // test robots
  for (let robot of robots) {
    if ((typeof robot.action) !== "function") {
      throw new Error('Invalid robot value')
      return null
    }
  }

  return new RobotInput(robots)
}

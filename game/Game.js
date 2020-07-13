import Polygon from "./model/Polygon.js"
import createPlayer from "./model/Player.js"
import {randomInteger} from "./util.js"
import createStage from "./model/Stage.js"
import createCanvasDisplay from "./display/CanvasDisplay.js"
import createConsoleDisplay from "./display/ConsoleDisplay.js"
import createFlag from "./model/Flag.js"
import createRectangle from "./model/Rectangle.js"

class Game {
  #displays = []
  #input

  // data
  #flags = []
  #players = []
  #stage
  #stageWidth = 20
  #stageHeight = 20

  // control the game
  #canNextTurn
  #playerTurn = 0

  addCanvasDisplay(canvasElement) {
    this.addDisplay(createCanvasDisplay(this.#stageWidth, this.#stageHeight, canvasElement))
  }

  addConsoleDisplay() {
    this.addDisplay(createConsoleDisplay(this.#stageWidth, this.#stageHeight))
  }

  addDisplay(display) {
    this.#displays.push(display)
  }

  addFlag() {
    const flag = createFlag(createRectangle(0, 0, 1, 1))

    do {
      this.randomPosition(flag.polygon)
    } while (this.collisionCounter(flag).length > 0)

    this.#flags.push(flag)
  }

  addPlayer(color) {
    const player = createPlayer(
      color,
      createRectangle(0, 0, 2, 2),
    )

    this.#players.push(player)
  }

  draw() {
    const options = {
      stage: this.#stage,
      players: this.#players,
      flags: this.#flags
    }

    for (let display of this.#displays) {
      display.draw(options)
    }
  }

  nextTurn() {
    if (!this.#canNextTurn) {
      return
    }
    this.#canNextTurn = false

    const playerNumber = this.playerTurnRotate()

    const opts = {
      player: this.#players[playerNumber],
      playerNumber
    }

    const p = Promise.resolve(opts)
      .then(this.runTestFlags())
      .then(this.runPlayerAction())
      .then(this.runTestFlagCapture())
      .then(() => this.draw())
      .then(this.runDelay())
      .catch(console.error)
      .then(() => this.#canNextTurn = true)
  }

  runPlayerAction() {
    return chainValues => {

      const publicData = {
        playerNumber: chainValues.playerNumber,
      }

      return this.#input.captureAction(publicData)
        .then((action) => {

          const privateData = {
            stage: this.#stage,
            player: chainValues.player,
            flags: this.#flags,
            players: this.#players
          }

          action.apply(privateData)
          return chainValues
        })
    }
  }

  runDelay() {
    return input => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(input)
        }, 0)
      })
    }
  }

  runTestFlagCapture() {
    return input => {
      const player = input.player

      for (let flag of this.#flags) {
        if (player.polygon.detectCollision(flag.polygon)) {
          player.score++
          console.log('Score', input.player.score)

          this.removeFlag(flag)
          this.addFlag()
          break
        }
      }

      return input
    }
  }

  runTestFlags() {
    return input => {
      if (this.#flags.length == 0) {
        this.addFlag()
      }
      return input
    }
  }

  playerTurnRotate() {
    if (this.#playerTurn >= this.#players.length) {
      this.#playerTurn = 0
    }
    return this.#playerTurn++
  }

  preparePlayers() {
    this.#playerTurn = 0

    for (let player of this.#players) {
      player.score = 0
      do {
        this.randomPosition(player.polygon)
      } while (this.collisionCounter(player).length > 0)
    }
  }

  prepareStage() {
    this.#stage = createStage(this.#stageWidth, this.#stageHeight)
  }

  /**
   *
   * @param {Polygon|Rectangle} polygon
   */
  randomPosition(polygon) {
    polygon.x = randomInteger(0, this.#stageWidth - polygon.width)
    polygon.y = randomInteger(0, this.#stageHeight - polygon.height)
  }

  run() {
    this.draw()

    this.#canNextTurn = true

    setInterval(() => {
      this.nextTurn()
    }, 100)

  }

  /**
   *
   * @param {Input} value
   */
  setInput(value) {
    this.#input = value
  }

  /**
   *
   * @param {Flag|Player} test
   * @returns {Flag|Player[]}
   */
  collisionCounter(test) {
    let r = []

    for (let player of this.#players) {
      if (test.equals(player)) {
        continue
      }

      if (test.polygon.detectCollision(player.polygon)) {
        r.push(player)
      }
    }

    for (let flag of this.#flags) {
      if (test.equals(flag)) {
        continue
      }

      if (test.polygon.detectCollision(flag.polygon)) {
        r.push(flag)
      }
    }

    return r
  }

  start() {
    this.prepareStage()
    this.preparePlayers()

    this.#flags = []
    this.addFlag()

    this.run()
  }

  /**
   *
   * @param {Flag} flag
   */
  removeFlag(flag) {
    for (let i in this.#flags) {
      if (flag.equals(this.#flags[i])) {
        this.#flags.splice(i, 1)
        return
      }
    }
  }
}

/**
 * Create a new instance game
 *
 * @returns {Game}
 */
export default function createGame() {
  return new Game()
}

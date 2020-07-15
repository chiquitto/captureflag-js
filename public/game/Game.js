import Polygon from "./model/Polygon.js"
import createPlayer from "./model/Player.js"
import {randomInteger, randomValue} from "./util.js"
import createStage from "./model/Stage.js"
import createCanvasDisplay from "./display/CanvasDisplay.js"
import createConsoleDisplay from "./display/ConsoleDisplay.js"
import createFlag from "./model/Flag.js"
import createRectangle from "./model/Rectangle.js"
import Action from "./action/Action.js";
import createSpecialFlag, {SpecialFlag} from "./model/SpecialFlag.js";
import GameConfig from "./GameConfig.js";

class Game {
  #displays = []
  #input

  // data
  #flags = []
  #players = []
  #stage
  #stageWidth = 20
  #stageHeight = 20
  #winner = null

  // control the game
  #canNextTurn
  #playerTurn = 0
  #playerSize = 20
  #flagSize = 10
  #stepSize = 10
  #maxFlags = 5
  #interval
  #maxSpecialPoints = 100

  /**
   *
   * @param {HTMLCanvasElement} canvasElement
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  addCanvasDisplay(canvasElement, canvasWidth, canvasHeight) {
    this.addDisplay(createCanvasDisplay(canvasWidth, canvasHeight, canvasElement))
  }

  addConsoleDisplay() {
    this.addDisplay(createConsoleDisplay())
  }

  addDisplay(display) {
    this.#displays.push(display)
  }

  addFlag() {

    const flag = (Math.random() < 0.1)
      ? this.specialFlagGenerator() : this.flagGenerator()
    console.log(flag)

    do {
      this.randomPosition(flag.polygon)
    } while (this.collisionCounter(flag).length > 0)

    this.#flags.push(flag)
  }

  flagGenerator() {
    const points = randomValue([1, 1, 1, 1, 2, 2, 3])
    const color = ['#00FF00', '#FF00FF', '#000000'][points - 1]

    return createFlag(points, color, createRectangle(
      0,
      0,
      this.#flagSize,
      this.#flagSize
    ))
  }

  specialFlagGenerator() {
    const points = randomInteger(1, GameConfig.playerMaxSpecialPoints / 10) * 10
    return createSpecialFlag(points, '#CCCCCC', createRectangle(
      0,
      0,
      this.#flagSize,
      this.#flagSize
    ))
  }

  addPlayer(color) {
    const player = createPlayer(
      this.#players.length,
      color,
      createRectangle(
        0,
        0,
        this.#playerSize,
        this.#playerSize
      ),
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
    if (this.isFinished()) {
      return
    }

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

      if (this.#input == null) {
        throw new Error('Input isnt defined')
        return chainValues
      }

      let action = this.#input.captureAction(this.publicData(chainValues))
      if (!(action instanceof Promise)) {
        action = Promise.resolve(action)
      }

      return action.then((action) => {

        const privateData = {
          stage: this.#stage,
          player: chainValues.player,
          flags: this.#flags,
          players: this.#players,
          options: {
            stepSize: this.#stepSize
          }
        }

        if (action instanceof Action) {
          action.apply(privateData)
        }
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
          if (flag instanceof SpecialFlag) {
            player.specialPoints += flag.points
          } else {
            player.score += flag.points
          }

          if (player.score >= 5) {
            //  this.#winner = player
          }

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

  setStageSize(width, height) {
    this.#stageWidth = width
    this.#stageHeight = height
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
    polygon.x = Math.round(randomInteger(0, this.#stageWidth - polygon.width) / this.#stepSize) * this.#stepSize
    polygon.y = Math.round(randomInteger(0, this.#stageHeight - polygon.height) / this.#stepSize) * this.#stepSize
  }

  run() {
    this.draw()

    this.#canNextTurn = true

    this.#interval = setInterval(() => {
      this.nextTurn()
    }, 250)

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
    this.#winner = null

    this.prepareStage()
    this.preparePlayers()

    this.#flags = []
    this.initFlags()

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

  isFinished() {
    if (this.#winner == null) {
      return false
    }

    clearInterval(this.#interval)
    this.#interval = null

    window.alert('O jogo acabou.')
    return true
  }

  publicData(args) {
    const playerData = player => {
      return {
        id: player.id,
        number: player.number,
        ...player.polygon.toPlainObject()
      }
    }
    const flagData = flag => {
      return {
        id: flag.id,
        points: flag.points,
        ...flag.polygon.toPlainObject()
      }
    }

    const publicData = {
      game: {
        stepSize: this.#stepSize
      },
      player: playerData(args.player),
      enemies: this.#players
        .filter(player => !player.equals(args.player))
        .map(playerData),
      flags: this.#flags.map(flagData)
    }
    // console.log(publicData)
    return publicData
  }

  initFlags() {
    for (let i = 0; i < this.#maxFlags; i++) {
      this.addFlag()
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

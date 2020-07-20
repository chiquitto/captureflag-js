import Polygon from "./model/Polygon.js"
import createPlayer from "./model/Player.js"
import {randomInteger, randomValue} from "./util.js"
import createStage from "./model/Stage.js"
import createCanvasDisplay from "./display/CanvasDisplay.js"
import createConsoleDisplay from "./display/ConsoleDisplay.js"
import createFlag from "./model/Flag.js"
import createRectangle from "./model/Rectangle.js"
import createSpecialFlag, {SpecialFlag} from "./model/SpecialFlag.js"
import GameConfig from "./GameConfig.js"
import ActionFactory from "./action/ActionFactory.js"
import createDispatcher, {Dispatcher} from "./dispatch/Dispatcher.js"
import PlayerTurn from "./PlayerTurn.js";

class Game {
  #displays = []
  #dispatcher

  // data
  #flags = []
  #players = []
  #stage
  #stageWidth = 20
  #stageHeight = 20

  // control the game
  #canNextTurn
  #playerToPlay = 0
  #playerTurn
  #interval
  #winner = null
  #finished = null
  #turn = 0 // number of turns

  // config
  #playerSize
  #flagSize
  #maxFlags

  constructor() {

  }

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

    do {
      this.randomPosition(flag.polygon)
    } while (this.collisionCounter(flag).length > 0)

    this.#flags.push(flag)
  }

  /**
   *
   * @param {number} points
   * @returns {Flag}
   */
  flagGenerator(points) {
    if ((points == undefined) || (points < 1) || (points > 4)) {
      points = randomValue([
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2,
        3, 3,
        4
      ])
    }
    const color = ['#00FF00', '#FF00FF', '#000000', '#FFFFFF'][points - 1]

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

  addPlayer(robot) {
    const player = createPlayer(
      this.#players.length,
      robot.name,
      robot.color,
      createRectangle(0, 0, 0, 0),
      robot
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
    this.#turn++

    const playerTurn = this.getPlayerTurn()

    const p = Promise.resolve(playerTurn)
      .then(this.runTestFlags())
      .then(this.runPlayerAction())
      .then(this.runTestFlagCapture())
      .then(this.runPlayerPosAction())
      .then(this.runDraw())
      // .then(this.runDelay())
      .then(this.runTestFinish())
      .catch(console.error)
      .finally(() => {
        this.#canNextTurn = true
      })

  }

  runPlayerPosAction() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {PlayerTurn}
     */
    const f = playerTurn => {
      playerTurn.player.turns++

      if ((playerTurn.player.turns % GameConfig.playerGainSpecialAt) == 0) {
        playerTurn.player.specialPoints += GameConfig.playerGainSpecial
      }

      playerTurn.stepsPassed++
      playerTurn.stepsLeft--

      return playerTurn
    }
    return f
  }

  runDraw() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {PlayerTurn}
     */
    const f = playerTurn => {
      this.draw()
      return playerTurn
    }
    return f
  }

  runPlayerAction() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {Promise<PlayerTurn>|PlayerTurn}
     */
    const f = playerTurn => {

      if (this.#dispatcher == null) {
        throw new Error('Dispatcher isnt defined')
        return playerTurn
      }

      let action = this.#dispatcher.captureAction(playerTurn.player,
        this.generatePublicData(playerTurn))

      if (!(action instanceof Promise)) {
        action = Promise.resolve(action)
      }

      return action.then((actionArgs) => {

        if ((typeof actionArgs == "string") || (actionArgs instanceof String)) {
          actionArgs = {type: actionArgs}
        }

        const privateData = {
          stage: this.#stage,
          player: playerTurn.player,
          playerTurn: playerTurn,
          flags: this.#flags,
          players: this.#players,
          options: {
            stepSize: playerTurn.stepSize
          }
        }

        let action = ActionFactory.factory(actionArgs)
        if (action !== null) {
          action.apply(privateData)
        }

        return playerTurn
      })
        .catch(err => {
          console.error(err)
          return playerTurn
        })
    }
    return f
  }

  runDelay() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {Promise<PlayerTurn>}
     */
    const f = playerTurn => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(playerTurn)
        }, 0)
      })
    }
    return f
  }

  runTestFinish() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {PlayerTurn}
     */
    const f = playerTurn => {
      for (let player of this.#players) {
        if (player.score >= GameConfig.finishPlayerPoints) {
          this.#finished = true
          this.#winner = player
          break
        }
      }

      if (this.#turn >= (this.#players.length * GameConfig.finishPlayerTurns)) {
        this.#finished = true
      }

      if (this.#finished && (this.#winner == null)) {
        this.#winner = this.#players
          .reduce((max, p) => p.score > max.score ? p : max)
      }

      return playerTurn
    }
    return f
  }

  runTestFlagCapture() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {PlayerTurn}
     */
    const f = playerTurn => {
      const player = playerTurn.player

      const flags2Remove = []
      const length = this.#flags.length

      for (let i = 0; i < length; i++) {
        let flag = this.#flags[i]

        if (player.polygon.detectCollision(flag.polygon)) {
          if (flag instanceof SpecialFlag) {
            player.specialPoints += flag.points
          } else {
            player.score += flag.points
          }

          flags2Remove.push(i)
        }
      }

      for (let x = flags2Remove.length - 1; x >= 0; x--) {
        this.removeFlag(flags2Remove[x])
        this.addFlag()
      }

      return playerTurn
    }
    return f
  }

  runTestFlags() {
    /**
     *
     * @param {PlayerTurn} playerTurn
     * @returns {PlayerTurn}
     */
    const f = playerTurn => {
      if (this.#flags.length == 0) {
        this.addFlag()
      }
      return playerTurn
    }

    return f
  }

  setStageSize(width, height) {
    this.#stageWidth = width
    this.#stageHeight = height
  }

  getPlayerTurn() {
    if (this.#playerTurn == null) {
      this.#playerTurn = this.createPlayerTurn()
    } else if (this.#playerTurn.stepsLeft == 0) {
      this.#playerToPlay++
      this.#playerTurn = this.createPlayerTurn()
    }
    return this.#playerTurn
  }

  /**
   *
   * @returns {PlayerTurn}
   */
  createPlayerTurn() {
    if (this.#playerToPlay >= this.#players.length) {
      this.#playerToPlay = 0
    }

    const playerNumber = this.#playerToPlay

    const playerTurn = new PlayerTurn()
    playerTurn.player = this.#players[playerNumber]
    playerTurn.playerNumber = playerNumber
    playerTurn.stepSize = 1
    playerTurn.stepsLeft = GameConfig.playerSteps
    playerTurn.stepsPassed = 0

    return playerTurn
  }

  preparePlayers() {
    this.#playerToPlay = 0

    for (let player of this.#players) {
      player.score = 0
      player.turns = 0

      player.polygon.width = this.#playerSize
      player.polygon.height = this.#playerSize

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

    this.#interval = setInterval(() => {
      this.nextTurn()
    }, Math.floor(1000 / GameConfig.gameFps))

  }

  /**
   *
   * @param {Dispatcher} value
   */
  setDispatcher(value) {
    this.#dispatcher = value
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
    this.#finished = false
    this.#turn = 0

    this.#playerSize = GameConfig.playerSize
    this.#flagSize = GameConfig.flagSize
    this.#maxFlags = GameConfig.maxFlags

    this.prepareStage()
    this.preparePlayers()
    this.prepareInputs()

    this.#flags = []
    this.initFlags()

    this.run()
  }

  /**
   *
   * @param {number} pos
   */
  removeFlag(pos) {
    this.#flags.splice(pos, 1)
  }

  isFinished() {
    if (!this.#finished) {
      return false
    }

    clearInterval(this.#interval)
    this.#interval = null

    window.alert(`O jogo acabou. O vencedor é ${this.#winner.name}.`)
    return true
  }

  generatePublicData(args) {
    /**
     *
     * @param {Player} player
     * @returns {{[p: string]: *}}
     */
    const playerData = player => {
      return {
        id: player.id,
        number: player.number,
        name: player.color,
        sp: player.specialPoints,
        ...player.polygon.toPlainObject()
      }
    }
    const flagData = flag => {
      return {
        id: flag.id,
        points: flag.points,
        type: (flag instanceof SpecialFlag) ? 'SpecialFlag' : 'PointFlag',
        polygon: flag.polygon.toPlainObject()
      }
    }

    const publicData = {
      game: {
        turn: this.#turn,
        stepSize: args.stepSize
      },
      stage: {
        width: this.#stageWidth,
        height: this.#stageHeight
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

  prepareInputs() {
    if (!(this.#dispatcher instanceof Dispatcher)) {
      this.#dispatcher = createDispatcher()
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

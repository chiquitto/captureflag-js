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
  #playerTurn = 0
  #playerSize = 2
  #flagSize = 1
  #maxFlags = 5
  #interval
  #winner = null
  #finished = null
  #turn = 0

  /**
   *
   * @param {HTMLCanvasElement} canvasElement
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  addCanvasDisplay(canvasElement, canvasWidth, canvasHeight) {
    if (canvasWidth == undefined) {
      canvasWidth = canvasElement.width
    }
    if (canvasHeight == undefined) {
      canvasHeight = canvasElement.height
    }
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

  flagGenerator() {
    const points = randomValue([
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      2, 2, 2, 2, 2,
      3, 3,
      4
    ])
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
      createRectangle(
        0,
        0,
        this.#playerSize,
        this.#playerSize
      ),
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

    const playerNumber = this.playerTurnRotate()

    const turnValues = new TurnValues()
    turnValues.player = this.#players[playerNumber]
    turnValues.playerNumber = playerNumber
    turnValues.stepSize = 1
    turnValues.turn = this.#turn

    const p = Promise.resolve(turnValues)
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
     * @param {TurnValues} turnValues
     * @returns {TurnValues}
     */
    const f = turnValues => {
      turnValues.player.turns++

      if (turnValues.player.turns % 5 == 0) {
        turnValues.player.specialPoints += 3
      }

      return turnValues
    }
    return f
  }

  runDraw() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {TurnValues}
     */
    const f = turnValues => {
      this.draw()
      return turnValues
    }
    return f
  }

  runPlayerAction() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {Promise<TurnValues>|TurnValues}
     */
    const f = turnValues => {

      if (this.#dispatcher == null) {
        throw new Error('Dispatcher isnt defined')
        return turnValues
      }

      let action = this.#dispatcher.captureAction(turnValues.player,
        this.generatePublicData(turnValues))

      if (!(action instanceof Promise)) {
        action = Promise.resolve(action)
      }

      return action.then((actionArgs) => {

        if ((typeof actionArgs == "string") || (actionArgs instanceof String)) {
          actionArgs = {type: actionArgs}
        }

        const privateData = {
          stage: this.#stage,
          player: turnValues.player,
          flags: this.#flags,
          players: this.#players,
          options: {
            stepSize: turnValues.stepSize
          }
        }

        let action = ActionFactory.factory(actionArgs)
        if (action !== null) {
          action.apply(privateData)
        }

        return turnValues
      })
    }
    return f
  }

  runDelay() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {Promise<TurnValues>}
     */
    const f = turnValues => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(turnValues)
        }, 0)
      })
    }
    return f
  }

  runTestFinish() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {TurnValues}
     */
    const f = turnValues => {
      for (let player of this.#players) {
        if (player.score >= 50) {
          this.#finished = true
          this.#winner = player
          break
        }
      }

      if (this.#turn >= (this.#players.length * 1000)) {
        this.#finished = true
      }

      if (this.#finished && (this.#winner == null)) {
        this.#winner = this.#players
          .reduce((max, p) => p.score > max.score ? p : max)
      }

      return turnValues
    }
    return f
  }

  runTestFlagCapture() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {TurnValues}
     */
    const f = turnValues => {
      const player = turnValues.player

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

      return turnValues
    }
    return f
  }

  runTestFlags() {
    /**
     *
     * @param {TurnValues} turnValues
     * @returns {TurnValues}
     */
    const f = turnValues => {
      if (this.#flags.length == 0) {
        this.addFlag()
      }
      return turnValues
    }

    return f
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
      player.turns = 0

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
    }, 200)

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
    const playerData = player => {
      return {
        id: player.id,
        number: player.number,
        name: player.color,
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

class TurnValues {
  #player
  #playerNumber
  #stepSize
  #turn

  /**
   *
   * @returns {Player}
   */
  get player() {
    return this.#player;
  }

  set player(value) {
    this.#player = value;
  }

  /**
   *
   * @returns {number}
   */
  get playerNumber() {
    return this.#playerNumber;
  }

  set playerNumber(value) {
    this.#playerNumber = value;
  }

  /**
   *
   * @returns {number}
   */
  get stepSize() {
    return this.#stepSize;
  }

  set stepSize(value) {
    this.#stepSize = value;
  }

  /**
   *
   * @returns {number}
   */
  get turn() {
    return this.#turn;
  }

  set turn(value) {
    this.#turn = value;
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

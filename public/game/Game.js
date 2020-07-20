import createCanvasDisplay from "./display/CanvasDisplay.js"
import createConsoleDisplay from "./display/ConsoleDisplay.js"
import {SpecialFlag} from "./model/SpecialFlag.js"
import GameConfig from "./GameConfig.js"
import ActionFactory from "./action/ActionFactory.js"
import createDispatcher, {Dispatcher} from "./dispatch/Dispatcher.js"
import RoundState from "./RoundState.js"
import createGameState from "./GameState.js"

class Game {
  #displays = []
  #dispatcher

  // control the game
  #canNextTurn
  #interval
  #winner = null
  #finished = null

  #state
  #stateOptions

  constructor() {
    this.#stateOptions = {
      players: []
    }
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

  addPlayer(robot) {
    this.#stateOptions.players.push({
      number: this.#stateOptions.players.length,
      robot
    })
  }

  draw() {
    const options = {
      stage: this.#state.stage,
      players: this.#state.players,
      flags: this.#state.flags
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

    const roundState = this.#state.getRoundState()

    const p = Promise.resolve(roundState)
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
     * @param {RoundState} roundState
     * @returns {RoundState}
     */
    const f = roundState => {
      if ((roundState.player.roundNumber % GameConfig.playerGainSpecialAt) == 0) {
        roundState.player.specialPoints += GameConfig.playerGainSpecial
      }

      roundState.stepsPassed++

      return roundState
    }
    return f
  }

  runDraw() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {RoundState}
     */
    const f = roundState => {
      this.draw()
      return roundState
    }
    return f
  }

  runPlayerAction() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {Promise<RoundState>|RoundState}
     */
    const f = roundState => {

      if (this.#dispatcher == null) {
        throw new Error('Dispatcher isnt defined')
        return roundState
      }

      let gamepadAction = this.#dispatcher.captureAction(roundState.player,
        this.#state.getPublicData())

      if (!(gamepadAction instanceof Promise)) {
        gamepadAction = Promise.resolve(gamepadAction)
      }

      let action
      return gamepadAction.then((gamepadArgs) => {

        if ((typeof gamepadArgs == "string") || (gamepadArgs instanceof String)) {
          gamepadArgs = {type: gamepadArgs}
        }

        action = ActionFactory.factory(gamepadArgs)
        if (action !== null) {
          action.apply(this.#state)
        }

        return 1
      })
        .catch(err => {
          console.error(err)
          return 2
        })
        .then(_ => {
          action.applyAfter(this.#state)
          return roundState
        })
    }

    return f
  }

  runDelay() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {Promise<RoundState>}
     */
    const f = roundState => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(roundState)
        }, 0)
      })
    }
    return f
  }

  runTestFinish() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {RoundState}
     */
    const f = roundState => {
      for (let player of this.#state.players) {
        if (player.score >= GameConfig.finishPlayerPoints) {
          this.#finished = true
          this.#winner = player
          break
        }
      }

      if (this.#state.turn >= (this.#state.players.length * GameConfig.finishPlayerTurns)) {
        this.#finished = true
      }

      if (this.#finished && (this.#winner == null)) {
        this.#winner = this.#state.players
          .reduce((max, p) => p.score > max.score ? p : max)
      }

      return roundState
    }
    return f
  }

  runTestFlagCapture() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {RoundState}
     */
    const f = roundState => {
      const player = roundState.player

      const flags2Remove = []
      const length = this.#state.flags.length

      for (let i = 0; i < length; i++) {
        let flag = this.#state.flags[i]

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
        this.#state.removeFlag(flags2Remove[x])
        this.#state.addFlag()
      }

      return roundState
    }
    return f
  }

  runTestFlags() {
    /**
     *
     * @param {RoundState} roundState
     * @returns {RoundState}
     */
    const f = roundState => {
      if (this.#state.flags.length == 0) {
        this.#state.prepareFlags()
      }
      return roundState
    }

    return f
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
   * @param {number} width
   * @param {number} height
   */
  setStageSize(width, height) {
    this.#stateOptions.stageWidth = width
    this.#stateOptions.stageHeight = height
  }

  start() {
    this.#state = createGameState(this.#stateOptions)

    this.#winner = null
    this.#finished = false

    this.prepareInputs()
    this.run()
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

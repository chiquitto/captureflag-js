import {randomInteger, randomValue} from "./util.js"
import createFlag from "./model/Flag.js"
import createRectangle from "./model/Rectangle.js"
import GameConfig from "./GameConfig.js"
import createSpecialFlag, {SpecialFlag} from "./model/SpecialFlag.js"
import createStage from "./model/Stage.js"
import createPlayer from "./model/Player.js"
import RoundState from "./RoundState.js"

/**
 *
 * @property {Flag[]} #flags
 * @property {Player[]} #players
 * @property {Stage} #stage
 */
class GameState {

  #flags
  #flagSize
  #maxFlags

  #players
  #playerSize
  #playerNumberToPlay

  #stage
  #stageWidth
  #stageHeight

  #roundNumber
  #roundState

  constructor(stateOptions) {

    this.#stageWidth = stateOptions.stageWidth ?? 20
    this.#stageHeight = stateOptions.stageHeight ?? 20
    this.prepareStage()

    this.#players = []
    this.#flags = []

    this.#roundNumber = 0

    this.prepareFlags()
    this.preparePlayers(stateOptions.players ?? [])
  }

  /**
   *
   * @returns {Flag[]}
   */
  get flags() {
    return this.#flags
  }

  /**
   *
   * @returns {Player[]}
   */
  get players() {
    return this.#players
  }

  /**
   *
   * @returns {RoundState}
   */
  get roundState() {
    return this.#roundState
  }

  /**
   *
   * @returns {Stage}
   */
  get stage() {
    return this.#stage
  }

  get stageHeight() {
    return this.#stageHeight
  }

  get stageWidth() {
    return this.#stageWidth
  }

  /**
   *
   * @returns {number}
   */
  get roundNumber() {
    return this.#roundNumber
  }

  set roundNumber(value) {
    this.#roundNumber = value
  }

  /**
   *
   * @returns {*|number}
   */
  addFlag() {
    return this.#flags.push(this.createFlag())
  }

  /**
   *
   * @param {Player} player
   * @returns {*|number}
   */
  addPlayer(player) {
    return this.#players.push(player)
  }

  /**
   *
   * @returns {RoundState}
   */
  createRoundState() {
    if (this.#playerNumberToPlay >= this.#players.length) {
      this.#playerNumberToPlay = 0
    }

    const playerNumber = this.#playerNumberToPlay

    const roundState = new RoundState()
    roundState.player = this.#players[playerNumber]
    roundState.playerNumber = playerNumber
    roundState.stepSize = 1
    roundState.stepsLeft = GameConfig.playerSteps
    roundState.stepsPassed = 0

    this.#roundNumber++
    roundState.player.roundNumber++

    return roundState
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

  /**
   *
   * @returns {Flag}
   */
  createFlag() {
    const flag = (Math.random() < 0.1)
      ? this.createFlagSpecialPoint() : this.createFlagPoint()

    do {
      this.randomPosition(flag.polygon)
    } while (this.collisionCounter(flag).length > 0)

    return flag
  }

  /**
   *
   * @param {number} points
   * @returns {Flag}
   */
  createFlagPoint(points) {
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

  /**
   *
   * @returns {SpecialFlag}
   */
  createFlagSpecialPoint() {
    const points = randomInteger(1, GameConfig.playerMaxSpecialPoints / 10) * 10
    return createSpecialFlag(points, '#CCCCCC', createRectangle(
      0,
      0,
      this.#flagSize,
      this.#flagSize
    ))
  }

  getPublicData() {
    /**
     *
     * @param {Player} player
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
      round: {
        roundNumber: this.roundNumber,
        stepSize: this.#roundState.stepSize,
        stepsPassed: this.#roundState.stepsPassed,
        stepsLeft: this.#roundState.stepsLeft
      },
      stage: {
        width: this.#stageWidth,
        height: this.#stageHeight
      },
      player: playerData(this.roundState.player),
      enemies: this.#players
        .filter(player => !player.equals(this.roundState.player))
        .map(playerData),
      flags: this.#flags.map(flagData)
    }
    return publicData
  }

  getRoundState() {
    if (this.#roundState == null) {
      this.#roundState = this.createRoundState()
    } else if (this.#roundState.stepsLeft == 0) {
      this.#playerNumberToPlay++
      this.#roundState = this.createRoundState()
    }

    this.#roundState.player.stepNumber++

    return this.#roundState
  }

  prepareFlags() {
    this.#flags = []

    this.#flagSize = GameConfig.flagSize
    this.#maxFlags = GameConfig.maxFlags

    for (let i = 0; i < this.#maxFlags; i++) {
      this.addFlag()
    }
  }

  preparePlayers(playersOptions) {
    this.#playerNumberToPlay = 0
    this.#playerSize = GameConfig.playerSize

    this.#players = []

    let player
    for (let opt of playersOptions) {
      player = createPlayer(
        opt.number,
        opt.robot.name,
        opt.robot.color,
        createRectangle(0, 0, 0, 0),
        opt.robot
      )

      player.score = 0
      player.turns = 0

      player.polygon.width = this.#playerSize
      player.polygon.height = this.#playerSize

      do {
        this.randomPosition(player.polygon)
      } while (this.collisionCounter(player).length > 0)

      this.addPlayer(player)
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
    polygon.x = randomInteger(0, this.stageWidth - polygon.width)
    polygon.y = randomInteger(0, this.stageHeight - polygon.height)
  }

  /**
   *
   * @param {number} pos
   */
  removeFlag(pos) {
    this.#flags.splice(pos, 1)
  }

}

export default function createGameState(stateOptions) {
  return new GameState(stateOptions)
}

import createPlayer from "./Player.js";
import {randomInteger} from "./util.js";
import createStage from "./Stage.js";
import createCanvasDisplay from "./display/CanvasDisplay.js";
import createPlayerShape from "./shapes/PlayerShape.js";
import createFlagShape from "./shapes/FlagShape.js";
import createConsoleDisplay from "./display/ConsoleDisplay.js";
import createFlag from "./Flag.js";

class Game {
  #shapes = []
  #displays = []
  #flags = []
  #players = []

  #stage
  #stageWidth = 20
  #stageHeight = 20

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
    const flag = createFlag()
    flag.shape = createFlagShape(flag.id, 0, 0, 1, 1, 'green')
    do {
      this.randomPosition(flag.shape)
    } while (this.shapeCollisionCounter(flag.shape).length > 0)

    this.#flags.push(flag)
    this.#shapes.push(flag.shape)
  }

  addPlayer(color) {
    const player = createPlayer(color)
    player.shape = createPlayerShape(player.id, 0, 0, 2, 2, player.color)

    this.#players.push(player)
    this.#shapes.push(player.shape)
  }

  addShape(shape) {
    this.#shapes.push(shape)
  }

  draw() {
    const options = {
      shapes: this.#shapes
    }

    for (let display of this.#displays) {
      display.draw(options)
    }
  }

  preparePlayers() {
    for (let player of this.#players) {
      player.score = 0
      do {
        this.randomPosition(player.shape)
      } while (this.shapeCollisionCounter(player.shape).length > 0)
    }
  }

  prepareStage() {
    this.#stage = createStage(this.#stageWidth, this.#stageHeight)
  }

  randomPosition(shape) {
    shape.x = randomInteger(0, this.#stage.width - shape.width)
    shape.y = randomInteger(0, this.#stage.height - shape.height)
  }

  run() {
    this.draw()
  }

  /**
   *
   * @param {Shape} shape
   * @returns {Shape[]}
   */
  shapeCollisionCounter(shape) {
    let r = []
    for (let aux of this.#shapes) {
      if (shape.equals(aux)) {
        continue
      }

      if (shape.detectCollision(aux)) {
        r.push(aux)
      }
    }
    return r
  }

  start() {
    this.prepareStage()
    this.preparePlayers()

    this.addFlag()
    this.run()
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

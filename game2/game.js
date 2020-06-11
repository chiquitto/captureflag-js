import createPlayer from "./player.js"
import {randomInteger} from "./util.js"
import createDisplayCanvasAdapter from "./display-canvas-adapter.js"
import createDisplayConsoleAdapter from "./display-console-adapter.js"

export default function createGame() {
  return new Game()
}

class Game {

  constructor() {
    this._display = []
    this._flags = []
    this._players = []
    this._shapes = []
    this._inputs = []

    this.width = 50
    this.height = 50
  }

  get players() {
    return this._players
  }

  addDisplayCanvas(canvasEl) {
    this._display.push(createDisplayCanvasAdapter(this, canvasEl))
  }

  addDisplayConsole() {
    this._display.push(createDisplayConsoleAdapter(this))
  }

  addInput(playerNo, input) {
    input.player = this._players[playerNo]
    // this._inputs.push(this._inputs)
  }

  addPlayer(color) {
    let player = createPlayer(color)
    this._players.push(player)
    this._shapes.push(player.shape)
  }

  draw() {
    for (let display of this._display) {
      display.draw()
    }
  }

  findShapeCollisionDetection(shape) {
    let r = []
    for (let aux of this._shapes) {
      if (shape.id == aux.id) {
        continue
      }

      if (this.shapeCollisionDetection(shape, aux)) {
        r.push(aux)
      }
    }
    return r
  }

  preparePlayers() {
    for (let player of this._players) {
      player.score = 0
      do {
        this.randomPosition(player)
      } while (this.findShapeCollisionDetection(player.shape).length > 0)
    }
  }

  randomPosition(item) {
    item.shape.x = randomInteger(0, this.width - item.shape.width)
    item.shape.y = randomInteger(0, this.height - item.shape.height)
  }

  run() {
    this.draw()
  }

  /**
   * @link https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
   * @link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
   *
   * @param {Shape} shape1
   * @param {Shape} shape2
   */
  shapeCollisionDetection(shape1, shape2) {

    var rect1 = {x: shape1.x, y: shape1.y, width: shape1.width, height: shape1.height}
    var rect2 = {x: shape2.x, y: shape2.y, width: shape2.width, height: shape2.height}

    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      return true
    } else {
      return false
    }
  }

  start() {
    this.preparePlayers()

    this.run()
  }
}

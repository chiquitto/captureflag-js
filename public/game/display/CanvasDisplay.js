import Display from "./Display.js";
import Polygon from "../model/Polygon.js";

class CanvasDisplay extends Display {

  #canvasWidth
  #canvasHeight
  #ctx

  #calculedStageVars = false
  #stageRatio = 1
  #stageX = 0
  #stageY = 0
  #stageWidth
  #stageHeight

  /**
   *
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {HTMLCanvasElement} canvasElement
   */
  constructor(canvasWidth, canvasHeight, canvasElement) {
    super();

    this.#canvasWidth = canvasWidth
    this.#canvasHeight = canvasHeight
    this.#ctx = canvasElement.getContext('2d')
  }

  calculateStageVars(stage) {
    if (this.#calculedStageVars) {
      return
    }

    this.#stageRatio = this.#canvasWidth / stage.width
    this.#stageWidth = Math.floor(stage.width * this.#stageRatio)
    this.#stageHeight = Math.floor(stage.height * this.#stageRatio)

    if (this.#stageHeight > this.#canvasHeight) {
      this.#stageRatio = this.#canvasHeight / stage.height
      this.#stageWidth = Math.floor(stage.width * this.#stageRatio)
      this.#stageHeight = Math.floor(stage.height * this.#stageRatio)
    }

    this.#stageY = this.#canvasHeight - this.#stageHeight
    this.#stageX = 0

    this.#calculedStageVars = true
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
  }

  /**
   *
   * @param {Object} options
   * @param {Stage} options.stage
   * @param {Player[]} options.players
   * @param {Flag[]} options.flags
   */
  draw(options) {
    this.clear()

    this.drawStage(options.stage)
    this.drawPlayers(options.players)
    this.drawFlags(options.flags)

    this.drawScores(options.players)
  }

  /**
   *
   * @param {Flag[]} flags
   */
  drawFlags(flags) {
    for (let i in flags) {
      const flag = flags[i]
      this.drawPolygon(flag.color, flag.polygon)

      this.#ctx.fillStyle = 'black'
      this.#ctx.font = "14px Arial"
      this.#ctx.fillText(`${i}`,
        (flag.polygon.x * this.#stageRatio) + this.#stageX,
        (flag.polygon.y * this.#stageRatio) + this.#stageY)
    }
  }

  /**
   *
   * @param {Player[]} players
   */
  drawPlayers(players) {
    for (let player of players) {
      this.drawPolygon(player.color, player.polygon)
    }
  }

  /**
   *
   * @param {string} color
   * @param {Polygon} polygon
   */
  drawPolygon(color, polygon) {
    const values = [
      (polygon.x * this.#stageRatio) + this.#stageX,
      (polygon.y * this.#stageRatio) + this.#stageY,
      polygon.width * this.#stageRatio,
      polygon.height * this.#stageRatio
    ]

    this.#ctx.fillStyle = color
    this.#ctx.fillRect(...values)
  }

  /**
   *
   * @param {Player[]} players
   */
  drawScores(players) {
    this.#ctx.fillStyle = 'black'
    this.#ctx.font = "14px Arial"

    let yPos = 15

    for (let i in players) {
      const player = players[i]
      // const playerNumber = parseInt(i, 10) + 1

      this.#ctx.fillText(`${player.name}: ${player.score} (Special: ${player.specialPoints})`, 10, yPos)

      yPos += 15
    }
  }

  /**
   *
   * @param {Stage} stage
   */
  drawStage(stage) {
    this.calculateStageVars(stage)

    this.#ctx.fillStyle = 'pink';
    this.#ctx.fillRect(this.#stageX, this.#stageY, this.#stageWidth, this.#stageHeight)
  }

}

export default function createCanvasDisplay(canvasWidth, canvasHeight, canvasElement) {
  return new CanvasDisplay(canvasWidth, canvasHeight, canvasElement)
}

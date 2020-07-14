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
   * @param canvasElement
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

    this.#stageWidth = Math.floor(this.#canvasWidth * this.#stageRatio)
    this.#stageHeight = Math.floor(stage.height * this.#stageRatio)

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

    this.drawScores(options.players)

    this.drawStage(options.stage)
    this.drawPlayers(options.players)
    this.drawFlags(options.flags)
  }

  /**
   *
   * @param {Flag[]} flags
   */
  drawFlags(flags) {
    for (let flag of flags) {
      this.drawPolygon(flag.color, flag.polygon)
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
   * @param {String} color
   * @param {Polygon} polygon
   */
  drawPolygon(color, polygon) {
    const values = [
      (polygon.x * this.#stageRatio) + this.#stageX,
      (polygon.y * this.#stageRatio) + this.#stageY,
      polygon.width * this.#stageRatio,
      polygon.height * this.#stageRatio
    ]

    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(...values)
  }

  /**
   *
   * @param {Player[]} players
   */
  drawScores(players) {
    this.#ctx.fillStyle = 'black';
    this.#ctx.font = "14px Arial"

    let yPos = 15

    for (let i in players) {
      const player = players[i]
      const playerNumber = parseInt(i, 10) + 1

      this.#ctx.fillText(`Player ${playerNumber}: ${player.score}`, 10, yPos)

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

export default function createCanvasDisplay(stageWidth, stageHeight, canvasElement) {
  return new CanvasDisplay(stageWidth, stageHeight, canvasElement)
}

import Display from "./Display.js";
import Polygon from "../model/Polygon.js";

class CanvasDisplay extends Display {

  #ctx

  /**
   *
   * @param canvasElement
   */
  constructor(stageWidth, stageHeight, canvasElement) {
    super(stageWidth, stageHeight);
    this.#ctx = canvasElement.getContext('2d')
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
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
    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(polygon.x, polygon.y, polygon.width, polygon.height)
  }
}

export default function createCanvasDisplay(stageWidth, stageHeight, canvasElement) {
  return new CanvasDisplay(stageWidth, stageHeight, canvasElement)
}

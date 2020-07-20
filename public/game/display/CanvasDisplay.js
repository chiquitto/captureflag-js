import Display from "./Display.js"
import Polygon from "../model/Polygon.js"
import {Rectangle} from "../model/Rectangle.js"
import {PlayerImgAvatar} from "../model/PlayerImgAvatar.js"

class CanvasDisplay extends Display {

  #canvasWidth
  #canvasHeight
  #ctx

  #stageDisplay

  /**
   *
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {HTMLCanvasElement} canvasElement
   */
  constructor(canvasWidth, canvasHeight, canvasElement) {
    super()

    this.#canvasWidth = canvasWidth
    this.#canvasHeight = canvasHeight
    this.#ctx = canvasElement.getContext('2d')

    this.#stageDisplay = new CanvasStageDisplay(this.#ctx, canvasWidth, canvasHeight)
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight)
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
    this.drawStage(options)
  }

  /**
   *
   * @param {Object} options
   * @param {Stage} options.stage
   * @param {Player[]} options.players
   * @param {Flag[]} options.flags
   */
  drawStage(options) {
    this.#stageDisplay.draw(options)
  }

  /**
   *
   * @param {Player[]} players
   */
  drawScores(players) {
    this.drawPlayers(players)
  }

  /**
   *
   * @param {Player[]} players
   */
  drawPlayers(players) {
    this.#ctx.fillStyle = 'black'
    this.#ctx.font = "20px monospace"
    this.#ctx.textAlign = "left"
    this.#ctx.textBaseline = "top"

    let yPos = 0

    for (let i in players) {
      const player = players[i]
      // const playerNumber = parseInt(i, 10) + 1

      this.#ctx.fillStyle = '#000000'
      this.#ctx.fillText(`${player.name}: ${player.score} (${player.specialPoints})`, 31, yPos)
      this.drawPlayerAvatar(yPos, player)

      yPos += 26
    }
  }

  drawPlayerAvatar(y, player) {
    let x = 5
    y -= 3
    let size = 26

    this.#ctx.fillStyle = player.color
    this.#ctx.fillRect(x, y, size, size)

    if (player.avatar instanceof PlayerImgAvatar) {
      this.#ctx.drawImage(player.avatar.avatar, x, y, size, size)
    }
  }

}

class CanvasStageDisplay {

  #ctx

  #canvasWidth
  #canvasHeight

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
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx, canvasWidth, canvasHeight) {
    this.#ctx = ctx
    this.#canvasWidth = canvasWidth
    this.#canvasHeight = canvasHeight
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

  /**
   *
   * @param {Object} options
   * @param {Stage} options.stage
   * @param {Player[]} options.players
   * @param {Flag[]} options.flags
   */
  draw(options) {
    this.calculateStageVars(options.stage)

    this.#ctx.fillStyle = 'pink'
    this.#ctx.fillRect(this.#stageX, this.#stageY, this.#stageWidth, this.#stageHeight)

    this.drawFlags(options.flags)
    this.drawPlayers(options.players)
  }

  /**
   *
   * @param {Flag[]} flags
   */
  drawFlags(flags) {
    for (let i in flags) {
      this.drawFlag(i, flags[i])
    }
  }

  /**
   *
   * @param {number} number
   * @param {Flag} flag
   */
  drawFlag(number, flag) {
    this.drawPolygon(flag.color, flag.polygon)

    this.drawTextInRectangle(`${number}`, flag.polygon)
  }

  /**
   *
   * @param {Player[]} players
   */
  drawPlayers(players) {
    for (let player of players) {
      this.drawPlayer(player)
    }
  }

  drawPlayer(player) {
    this.drawPolygon(player.color, player.polygon)

    if (player.avatar instanceof PlayerImgAvatar) {
      this.drawImage(player.avatar.avatar,
        player.polygon.x, player.polygon.y,
        player.polygon.width, player.polygon.height)
    }

    // this.drawTextInRectangle(`${player.number}`, player.polygon)
  }

  drawImage(img, x, y, width, height) {
    width = this.dimenWidth(width)
    height = this.dimenHeight(height)

    this.#ctx.drawImage(
      img,
      this.posX(x), this.posY(y),
      width, height
    )
  }

  /**
   *
   * @param {string} color
   * @param {Polygon} polygon
   */
  drawPolygon(color, polygon) {
    this.drawPolygonRectangle(color, polygon)
  }

  /**
   *
   * @param {string} color
   * @param {Rectangle} rectangle
   */
  drawPolygonRectangle(color, rectangle) {
    this.#ctx.fillStyle = color
    this.#ctx.fillRect(this.posX(rectangle.x),
      this.posY(rectangle.y),
      this.dimenWidth(rectangle.width),
      this.dimenHeight(rectangle.height))
  }

  drawTextInRectangle(text, rectangle) {
    this.#ctx.fillStyle = 'black'
    this.#ctx.font = "10px monospace"
    this.#ctx.textAlign = "center"
    this.#ctx.textBaseline = "middle"

    const dimenWidth = this.dimenWidth(rectangle.width)
    const dimenHeight = this.dimenWidth(rectangle.height)

    this.#ctx.fillText(
      text,
      this.posX(rectangle.x) + (dimenWidth / 2),
      this.posY(rectangle.y) + (dimenHeight / 2),
      dimenWidth
    )
  }

  posX(x) {
    return (x * this.#stageRatio) + this.#stageX
  }

  posY(y) {
    return (y * this.#stageRatio) + this.#stageY
  }

  dimenWidth(width) {
    return width * this.#stageRatio
  }

  dimenHeight(height) {
    return height * this.#stageRatio
  }

}

export default function createCanvasDisplay(canvasWidth, canvasHeight, canvasElement) {
  if (canvasWidth == undefined) {
    canvasWidth = canvasElement.width
  }
  if (canvasHeight == undefined) {
    canvasHeight = canvasElement.height
  }

  return new CanvasDisplay(canvasWidth, canvasHeight, canvasElement)
}


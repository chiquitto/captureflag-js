import Display from "./display.js"

export default function createDisplayCanvasAdapter(game, canvasEl) {
  return new DisplayCanvasAdapter(game, canvasEl)
}

class DisplayCanvasAdapter extends Display {
  constructor(game, canvasEl) {
    super(game)
    this._canvasEl = canvasEl
    this.ctx = canvasEl.getContext('2d')
  }

  clear() {
    this.ctx.clearRect(0, 0, this._game.width, this._game.height);
  }

  draw() {
    this.clear()
    this.drawPlayers()
  }

  drawPlayers() {
    for (let player of this._game.players) {
      this.drawShape(player.shape)
    }
  }

  drawShape(shape) {
    console.log(shape)
    this.ctx.fillStyle = shape.color;
    this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
  }
}

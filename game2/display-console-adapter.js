import Display from "./display.js"

export default function createDisplayConsoleAdapter(game) {
  return new DisplayConsoleAdapter(game)
}

class DisplayConsoleAdapter extends Display {
  constructor(game) {
    super(game)
  }

  clear() {
    this._string = []
    for (let y = 0; y < this._game.height; y++) {
      this._string[y] = []
      for (let x = 0; x < this._game.width; x++) {
        this._string[y][x] = '.'
      }
    }
  }

  draw() {
    this.clear()
    this.drawPlayers()

    let out = []
    for (let t of this._string) {
      out.push(t.join(''))
    }
    console.log(out.join("\n"))
  }

  drawPlayers() {
    for (let player of this._game.players) {
      this.drawShape(player.shape)
    }
  }

  drawShape(shape) {
    let xmax = shape.x + shape.width
    let ymax = shape.y + shape.height
    for (let y = shape.y; y < ymax; y++) {
      for (let x = shape.x; x < xmax; x++) {
        this._string[y][x] = shape.color.substring(0, 1)
      }
    }
  }
}

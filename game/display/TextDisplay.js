import Display from "./Display.js";

export default class TextDisplay extends Display {

  #stringBuffer

  constructor(stageWidth, stageHeight) {
    super(stageWidth, stageHeight);
    this.#stringBuffer = []
  }

  get stringBuffer() {
    return this.#stringBuffer
  }

  clear() {
    this.#stringBuffer = []
    for (let y = 0; y < this.stageHeight; y++) {
      this.#stringBuffer[y] = []
      for (let x = 0; x < this.stageWidth; x++) {
        this.#stringBuffer[y][x] = '.'
      }
    }
  }

  draw(options) {
    this.clear()
    this.drawShapes(options.shapes)
  }

  /**
   *
   * @param {Shape[]} shapes
   */
  drawShapes(shapes) {
    for (let shape of shapes) {
      this.drawShape(shape)
    }
  }

  /**
   *
   * @param {Shape} shape
   */
  drawShape(shape) {
    let xmax = shape.x + shape.width
    let ymax = shape.y + shape.height
    for (let y = shape.y; y < ymax; y++) {
      for (let x = shape.x; x < xmax; x++) {
        this.#stringBuffer[y][x] = shape.color.substring(0, 1)
      }
    }
  }

}

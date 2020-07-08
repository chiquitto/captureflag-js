import Display from "./Display.js";

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
    console.log(shape)
    this.#ctx.fillStyle = shape.color;
    this.#ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
  }
}

export default function createCanvasDisplay(stageWidth, stageHeight, canvasElement) {
  return new CanvasDisplay(stageWidth, stageHeight, canvasElement)
}

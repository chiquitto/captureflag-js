export default class Display {

  #stageWidth
  #stageHeight

  constructor(stageWidth, stageHeight) {
    this.#stageWidth = stageWidth
    this.#stageHeight = stageHeight
  }

  get stageWidth() {
    return this.#stageWidth
  }

  get stageHeight() {
    return this.#stageHeight
  }

  draw(options) {
    throw new Error('Display.draw not implemented')
  }

}

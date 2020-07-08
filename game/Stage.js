class Stage {
  #width
  #height

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  constructor(width, height) {
    this.#width = width
    this.#height = height
  }
}

export default function createStage(width, height) {
  return new Stage(width, height)
}

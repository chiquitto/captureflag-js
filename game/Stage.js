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

  /**
   *
   * @param {Shape} shape
   * @returns {boolean} true if Shape is contained in Stage
   */
  isContained(shape) {
    return (shape.x >= 0)
      && (shape.y >= 0)
      && (shape.xEnd <= this.#width)
      && (shape.yEnd <= this.#height)
  }
}

export default function createStage(width, height) {
  return new Stage(width, height)
}

import {Rectangle} from "./Rectangle.js";

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
   * @param {Polygon|Rectangle} polygon
   * @returns {boolean} true if Polygon is contained in Stage
   */
  isContained(polygon) {
    if (polygon instanceof Rectangle) {
      return (polygon.x >= 0)
        && (polygon.y >= 0)
        && (polygon.xRight <= this.#width)
        && (polygon.yBottom <= this.#height)
    }

    throw new Error('Invalid polygon argument')
  }
}

export default function createStage(width, height) {
  return new Stage(width, height)
}

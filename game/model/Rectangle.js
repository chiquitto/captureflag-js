import Polygon from "./Polygon.js";

class Rectangle extends Polygon {
  #x
  #y
  #width
  #height

  constructor(x, y, width, height) {
    super();

    this.#x = x
    this.#y = y
    this.#width = width
    this.#height = height
  }

  get x() {
    return this.#x
  }

  get xRight() {
    return this.#x + this.#width
  }

  set x(value) {
    this.#x = value
  }

  get y() {
    return this.#y
  }

  get yBottom() {
    return this.#y + this.#height
  }

  set y(value) {
    this.#y = value
  }

  get width() {
    return this.#width
  }

  set width(value) {
    this.#width = value
  }

  get height() {
    return this.#height
  }

  set height(value) {
    this.#height = value
  }
}

export default function createRectangle(x, y, width, height) {
  return new Rectangle(x, y, width, height)
}
export { Rectangle }

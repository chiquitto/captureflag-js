class Flag {
  #id
  #shape
  #color

  constructor() {
    this.#id = Math.random()
    this.#color = 'green'
  }

  get id() {
    return this.#id
  }

  get shape() {
    return this.#shape
  }

  set shape(shape) {
    this.#shape = shape
  }
}

export default function createFlag() {
  return new Flag()
}

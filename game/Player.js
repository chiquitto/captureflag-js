class Player {
  #id
  #score = 0
  #shape
  #color

  constructor(color) {
    this.#id = Math.random()
    this.#color = color
  }

  get id() {
    return this.#id
  }

  get score() {
    return this.#score
  }

  set score(score) {
    this.#score = score
  }

  get shape() {
    return this.#shape
  }

  set shape(shape) {
    this.#shape = shape
  }

}

export default function createPlayer(color) {
  let player = new Player(color)
  return player
}

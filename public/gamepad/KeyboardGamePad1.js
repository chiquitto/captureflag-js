export default class KeyboardGamePad1 {

  #map

  constructor() {
    this.defineMap()
  }

  defineMap() {
    this.map = {
      w: 'UP',
      d: 'RIGHT',
      s: 'DOWN',
      a: 'LEFT',
    }
  }

  action(publicData, gameEvent) {
    return this.#map[gameEvent.input];
  }

  get color() {
    return '#FFFFFF'
  }

  set map(value) {
    this.#map = value
  }

  get name() {
    return 'Keyboard1'
  }

}

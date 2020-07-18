import KeyboardGamePad1 from "./KeyboardGamePad1.js";

export default class KeyboardGamePad2 extends KeyboardGamePad1 {

  defineMap() {
    this.map = {
      ArrowUp: 'UP',
      ArrowRight: 'RIGHT',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT'
    }
  }

  get color() {
    return '#FFFF00'
  }

  get name() {
    return 'Keyboard2'
  }

}

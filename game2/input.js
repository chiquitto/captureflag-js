export default class Input {
  get player() {
    return this._player;
  }

  set player(value) {
    this._player = value;
  }

  triggerLeft() {
    console.log('left', this._player)
  }

  triggerRight() {
    console.log('right', this._player)
  }

  triggerUp() {
    console.log('up', this._player)
  }

  triggerDown() {
    console.log('down', this._player)
  }

}

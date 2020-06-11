import createPosition from "./position.js"
import { randomInteger } from "./util.js"

export default class GameItem {
    constructor(color, size) {
        this._color = color
        this._size = size
        this._id = Math.random()
    }

    get color() {
        return this._color
    }

    get game() {
        return this._game
    }

    get id() {
        return this._id
    }

    get position() {
        return this._position
    }

    get size() {
        return this._size
    }

    set game(game) {
        this._game = game
    }

    set position(position) {
        this._position = position
    }

    randomPosition() {
        this._position = createPosition(
            randomInteger(0, this._game.size.width - this.size.width),
            randomInteger(0, this._game.size.height - this.size.height)
        )
    }
}
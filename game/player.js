import createPosition from "./position.js"
import {randomInteger} from "./util.js"
import Size from "./size.js"
import {MoveAction} from "./action-move.js";

function createPlayer(game) {
    return new Player(game)
}

class Player {
    constructor(color) {
        this.color = color
        this.size = new Size(10, 10)
        this._id = Math.random()
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

    set game(game) {
        this._game = game
    }

    set position(position) {
        this._position = position
    }

    do(action) {
        action.do(this)
    }

    randomPosition() {
        this._position = createPosition(
            randomInteger(0, this._game.size.width - this.size.width),
            randomInteger(0, this._game.size.height - this.size.height)
        )
    }
}

export default createPlayer
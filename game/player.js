import createPosition from "./position.js"
import {randomInteger} from "./util.js"
import Size from "./size.js"

function createPlayer(game) {
    let player = new Player(game)

    return player
}

class Player {
    constructor(color) {
        this.color = color
        this.size = new Size(10, 10)
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

    randomPosition() {
        this._position = createPosition(
            randomInteger(0, this._game.size.width - this.size.width),
            randomInteger(0, this._game.size.height - this.size.height)
        )
    }
}

export default createPlayer
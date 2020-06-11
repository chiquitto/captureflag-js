import Size from "./size.js"
import GameItem from "./game-item.js"

function createPlayer(game) {
    return new Player(game)
}

class Player extends GameItem {
    constructor(color) {
        super(color, new Size(10, 10))
        this._score = 0
    }

    get score() {
        return this._score
    }

    set score(score) {
        this._score = score
        console.log(this)
    }

    do(action) {
        action.do(this)
    }
}

export default createPlayer
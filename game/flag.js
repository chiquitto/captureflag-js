import GameItem from "./game-item.js"
import Size from "./size.js"

class Flag extends GameItem {

    constructor(game) {
        super('green', new Size(5, 5))
        this.game = game
        this.randomPosition()
    }

}

export default function createFlag(game) {
    return new Flag(game)
}
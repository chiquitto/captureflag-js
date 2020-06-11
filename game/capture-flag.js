import createCanvasStageAdapter from "./canvas-stage-adapter.js"
import createPlayer from "./player.js"
import Size from "./size.js"
import createStage from "./stage.js"
import createKeyboardInputListener from "./keyboard-input-listener.js";
import createFlag from "./flag.js";

class CaptureFlag {

    constructor() {
        this._size = new Size(50, 50)
    }

    get flags() {
        return this._flags
    }

    get players() {
        return this._players
    }

    get size() {
        return this._size
    }

    set players(players) {
        for (let player of players) {
            player.game = this
        }
        this._players = players
    }

    set stageAdapter(stageAdapter) {
        this._stage = createStage(this, stageAdapter)
    }

    playerDo(action) {
        action.do()
        this.draw()
    }

    draw() {
        this._stage.draw()
    }

    start() {
        this.startPlayerPositions()
        this.startFlags()
        this.startInputListener()

        this.draw()
    }

    startFlags() {
        this._flags = []
        this.addFlag()
    }

    addFlag() {
        this._flags.push(createFlag(this))
    }

    removeFlag(flag) {
        for (let i = 0; i < this._flags.length; i++) {
            this._flags.splice(i, 1)
        }
    }

    playerHitFlag(player, flag) {
        this.removeFlag(flag)
        this.addFlag()
        player.score++
    }

    startPlayerPositions() {
        let playersOk = []

        let i = 0
        while (i < this._players.length) {
            let player = this._players[i]
            player.randomPosition()

            let auxOk = true
            for (let playerTest of playersOk) {
                if (this.collisionDetection(player, playerTest)) {
                    auxOk = false
                    break
                }
            }

            if (auxOk) {
                playersOk.push(player)
                i++
            }
        }
    }

    startInputListener() {
        createKeyboardInputListener(this)
    }

    /**
     * @link https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
     * @link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     * 
     * @param {Player} obj1 
     * @param {Player} obj2 
     */
    collisionDetection(obj1, obj2) {

        var rect1 = {x: obj1.position.x, y: obj1.position.y, width: obj1.size.width, height: obj1.size.height}
        var rect2 = {x: obj2.position.x, y: obj2.position.y, width: obj2.size.width, height: obj2.size.height}

        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) {
            return true
        } else {
            return false
        }
    }
}

export default function createGame(stageEl) {
    let game = new CaptureFlag()
    game.stageAdapter = createCanvasStageAdapter(stageEl)
    game.players = [
        createPlayer('red'),
        createPlayer('blue')
    ]
    game.start()

    console.log(game)
}
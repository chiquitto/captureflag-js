import createPlayer from "./player.js"

class CaptureFlag {
    constructor() {
    }

    set players(players) {
        this._players = players
    }

    start() {
        this.startPlayerPositions()
    }

    startPlayerPositions() {
        for (let player of this._players) {
            
        }
    }
}

export default function createGame(canvasEl) {
    let game = new CaptureFlag()
    game.players = [createPlayer(), createPlayer()]
    game.start()

    console.log(game)
}
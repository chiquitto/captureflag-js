function createCanvasStageAdapter(canvasEl) {
    return new CanvasStageAdapter(canvasEl)
}

class CanvasStageAdapter {
    constructor(canvasEl) {
        this._canvasEl = canvasEl
        this.ctx = this._canvasEl.getContext('2d')
    }

    set game(game) {
        this._game = game
    }

    clearStage() {
        this.ctx.clearRect(0, 0, this._game.size.width, this._game.size.height);
    }

    drawFlags() {
        for (let flag of this._game.flags) {
            this.ctx.fillStyle = flag.color; 
            this.ctx.fillRect(flag.position.x, flag.position.y, flag.size.width, flag.size.height)
        }
    }

    drawPlayers() {
        for (let player of this._game.players) {
            this.ctx.fillStyle = player.color; 
            this.ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height)
        }
    }
}

export default createCanvasStageAdapter
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

    drawPlayers() {
        for (let player of this._game.players) {
            console.log(player.position, player.size)
            this.ctx.fillStyle = player.color; 
            this.ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height)
        }
    }
}

export default createCanvasStageAdapter
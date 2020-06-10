function createStage(game, stageAdapter) {
    return new Stage(game, stageAdapter)
}

class Stage {
    constructor(game, stageAdapter) {
        this._game = game

        this._stageAdapter = stageAdapter
        this._stageAdapter.game = game
    }

    draw() {
        this._stageAdapter.draw()
    }
}

export default createStage
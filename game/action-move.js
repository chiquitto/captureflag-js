import Action from "./action.js"

class MoveAction extends Action {
    constructor(player, action) {
        super(player, action)
    }

    do () {
        this.prepareRollback()

        switch(this.action) {
            case 'UP':
                this.player.position.y--
                break
            case 'RIGHT':
                this.player.position.x++
                break
            case 'DOWN':
                this.player.position.y++
                break
            case 'LEFT':
                this.player.position.x--
                break
        }

        let game = this.player.game
        for (let player of game.players) {
            if (this.player.id == player.id) {
                continue
            }

            if (game.collisionDetection(this.player, player)) {
                this.rollback()
            }
        }
    }

    prepareRollback() {
        this.rollbackData = {
            x: this.player.position.x,
            y: this.player.position.y
        }
    }

    rollback() {
        this.player.position.x = this.rollbackData.x
        this.player.position.y = this.rollbackData.y
    }
}

function createMoveAction(player, direction) {
    return new MoveAction(player, direction)
}

export {createMoveAction, MoveAction}
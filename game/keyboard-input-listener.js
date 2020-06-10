import {createMoveAction} from "./action-move.js";

function createKeyboardInputListener(game) {
    return new KeyboardInputListener(game)
}

class KeyboardInputListener {

    constructor(game) {
        for (let i = 0; i < game.players.length; i++) {
            document.querySelector(`#player${i}Up`).addEventListener('click', () => {
                game.playerDo(createMoveAction(game.players[i], 'UP'))
            })
            document.querySelector(`#player${i}Right`).addEventListener('click', () => {
                game.playerDo(createMoveAction(game.players[i], 'RIGHT'))
            })
            document.querySelector(`#player${i}Down`).addEventListener('click', () => {
                game.playerDo(createMoveAction(game.players[i], 'DOWN'))
            })
            document.querySelector(`#player${i}Left`).addEventListener('click', () => {
                game.playerDo(createMoveAction(game.players[i], 'LEFT'))
            })
        }
    }

}

export default createKeyboardInputListener
import createGame from './game/Game.js';
import CloserFlagRobot from "./gamepad/CloserFlagRobot.js";
import HighestValueRobot from "./gamepad/HighestValueRobot.js"
import SpecialValueRobot from "./gamepad/SpecialValueRobot.js"
import createPromiseDispatcher from "./game/dispatch/PromiseDispatcher.js"
import {createGameEventFromKeyboardEvent} from "./game/dispatch/GameEvent.js"
import KeyboardGamePad1 from "./gamepad/KeyboardGamePad1.js"
import KeyboardGamePad2 from "./gamepad/KeyboardGamePad2.js"
import Highest2ValueRobot from "./gamepad/Highest2ValueRobot.js"
import Highest3ValueRobot from "./gamepad/Highest3ValueRobot.js"

let game = createGame()
game.addPlayer(new CloserFlagRobot())
game.addPlayer(new HighestValueRobot())
game.addPlayer(new Highest2ValueRobot())
game.addPlayer(new Highest3ValueRobot())
// game.addPlayer(new SpecialValueRobot())
// game.addPlayer(new KeyboardGamePad1())
// game.addPlayer(new KeyboardGamePad2())

/*const keyboardEventListener = evt => {
  input.resolve(createGameEventFromKeyboardEvent(evt))
}
let input = createPromiseDispatcher()
// document.addEventListener('click', keyboardEventListener)
document.addEventListener('keyup', keyboardEventListener)
game.setDispatcher(input)*/

game.setStageSize(20, 20)
game.addCanvasDisplay(document.getElementById('stage1'))

game.start()

console.log(game)

export class GameEvent {

  #type
  #input

  constructor(type, input) {
    this.#type = type;
    this.#input = input;
  }

  toPlainObject() {
    return {
      type: this.#type,
      input: this.#input
    }
  }

}

export function createGameEvent() {
  return new GameEvent(null, null)
}

/**
 *
 * @param {KeyboardEvent} event
 * @returns {GameEvent}
 */
export function createGameEventFromKeyboardEvent(event) {
  return new GameEvent('KeyboardEvent', event.key)
}

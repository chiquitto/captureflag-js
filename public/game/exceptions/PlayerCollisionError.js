export default class PlayerCollisionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PlayerCollisionError"
  }
}

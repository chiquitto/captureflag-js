export default class InvalidCallSpecialError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCallSpecialActionError"
  }
}

export default class InvalidPlayerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPlayerError"
  }
}

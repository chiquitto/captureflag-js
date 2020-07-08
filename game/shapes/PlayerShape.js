import Shape from "./Shape.js";

class PlayerShape extends Shape {
  constructor(id, x, y, width, height, color) {
    super(id, x, y, width, height, color)
  }
}

export default function createPlayerShape(id, x, y, width, height, color) {
  return new PlayerShape(id, x, y, width, height, color)
}

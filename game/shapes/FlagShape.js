import Shape from "./Shape.js";

export class FlagShape extends Shape {

}

export default function createFlagShape(id, x, y, width, height, color) {
  return new FlagShape(id, x, y, width, height, color)
}

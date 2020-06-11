class Shape {
  get color() {
    return this._color;
  }

  get parent() {
    return this._parent;
  }

  set color(value) {
    this._color = value;
  }

  set parent(value) {
    this._parent = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get id() {
    return this._id
  }

  constructor(id, x, y, width, height, color) {
    this._id = id
    this._x = x
    this._y = y
    this._width = width
    this._height = height

    this._color = color || 'red'
  }


}

export default function createShape(id, x, y, width, height, color) {
  return new Shape(id, x, y, width, height, color)
}

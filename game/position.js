function createPosition(x, y) {
    let pos = new Position
    pos.x = x
    pos.y = y
    return pos
}

class Position {
    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    set x(x) {
        this._x = x
    }

    set y(y) {
        this._y = y
    }
}

export default createPosition
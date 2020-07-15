import {Flag} from "./Flag.js";

class SpecialFlag extends Flag {

}

/**
 *
 * @param {number} points
 * @param {string} color
 * @param {Polygon|Rectangle} polygon
 * @returns {SpecialFlag}
 */
export default function createSpecialFlag(points, color, polygon) {
  return new SpecialFlag(points, color, polygon)
}

export {SpecialFlag}

import { factoredInteger } from './util';
import {createLogger} from "../lib/log";
const log = createLogger('3D:');

export default class Bin {

  name = '';
  width = 0;
  height = 0;
  depth = 0;
  maxWeight = 0;

  items = [];

  constructor(name, w, h, d, mw) {
    this.name = name;
    this.width = factoredInteger( w );
    this.height = factoredInteger( h );
    this.depth = factoredInteger( d );
    this.maxWeight = factoredInteger( mw );
  }

  getName() {
    return this.name;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getDepth() {
    return this.depth;
  }

  getMaxWeight() {
    return this.maxWeight;
  }

  getItems() {
    return this.items;
  }

  getVolume() {
    return this.getWidth() * this.getHeight() * this.getDepth();
  }

  getPackedWeight() {
    return this.items.reduce( ( weight, item ) => weight + item.getWeight(), 0 );
  }

  weighItem(item) {
    const maxWeight = this.getMaxWeight();
    return ! maxWeight || item.getWeight() + this.getPackedWeight() <= maxWeight;
  }

  /**
   * Calculate a score for a given item and rotation type.
   *
   * Scores are higher for rotations that closest match item dimensions to Bin dimensions.
   * For example, rotating the item so the longest side is aligned with the longest Bin side.
   *
   * Example (Bin is 11 x 8.5 x 5.5, Item is 8.1 x 5.2 x 5.2):
   *  Rotation 0:
   *    8.1 / 11  = 0.736
   *    5.2 / 8.5 = 0.612
   *    5.2 / 5.5 = 0.945
   *    -----------------
   *    0.736 ** 2 + 0.612 ** 2 + 0.945 ** 2 = 1.809
   *
   *  Rotation 1:
   *    8.1 / 8.5 = 0.953
   *    5.2 / 11 = 0.473
   *    5.2 / 5.5 = 0.945
   *    -----------------
   *    0.953 ** 2 + 0.473 ** 2 + 0.945 ** 2 = 2.025
   *
   * @param {Item} item
   * @param {int} rotationType
   * @return {float} score
   */
  scoreRotation(item, rotationType) {
    item.rotationType = rotationType;
    let d = item.getDimension();

    // If the item doesn't fit in the Bin
    if ( this.getWidth() < d[0] || this.getHeight() < d[1] || this.getDepth() < d[2] ) {
        return 0;
    }

    // Square the results to increase the impact of high values (e.g. > 0.8)
    const widthScore = Math.pow( d[0] / this.getWidth(), 2 );
    const heightScore = Math.pow( d[1] / this.getHeight(), 2 );
    const depthScore = Math.pow( d[2] / this.getDepth(), 2 );

    return widthScore + heightScore + depthScore;
  }

  /**
   * Calculate the best rotation order for a given Item based on scoreRotation().
   *
   * @param {Item} item
   * @return {Array} Rotation types sorted by their score, DESC
   */
  getBestRotationOrder(item) {
    const rotationScores = {};

    // Score all rotation types
	for (let i=0; i<item.allowedRotation.length; i++) {
	    const r = item.allowedRotation[i];
		rotationScores[r] = this.scoreRotation( item, r );
    }

    // Sort the rotation types (index of scores object) DESC
    // and ensure Int values (Object.keys returns strings)
    const sortedRotations = Object.keys( rotationScores ).sort( ( a, b ) => {
      return rotationScores[b] - rotationScores[a];
    } ).map( Number );

    return sortedRotations;
  }

  putItem(item, p) {
    const box = this;
    let fit = false;
    const rotations = this.getBestRotationOrder( item );
    item.position = p;

    for ( let i = 0; i < rotations.length; i++ ) {
      item.rotationType = rotations[i];
      let d = item.getDimension();

      if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {
        fit = false;
      } else {
        fit = true;

        for (let j=0; j<box.items.length; j++) {
          let _j = box.items[j];
          if (_j.intersect(item)) {
            fit = false;
            break;
          }
        }

        if (fit) {
          box.items.push(item);
        }
      }

      log('try to putItem', fit, 'item', item.toString(), 'box', box.toString());

      if (fit) {
        break;
      }
    }
    return fit;
  }

  toString() {
    return `Bin:${this.name} (WxHxD = ${this.getWidth()}x${this.getHeight()}x${this.getDepth()}, MaxWg. = ${this.getMaxWeight()})`;
  }

}
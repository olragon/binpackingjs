import { factoredInteger } from './util';

export default class Bin {

  name = '';
  width = 0;
  height = 0;
  depth = 0;
  maxWeight = 0;

  items = [];

  constructor(name, w, h, d, mw, p = 3) {
    this.name = name;
    this.width = factoredInteger( w, p );
    this.height = factoredInteger( h, p );
    this.depth = factoredInteger( d, p );
    this.maxWeight = factoredInteger( mw, p );
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

  putItem(item, p) {
    let box = this;
    let fit = false;

    item.position = p;
    for (let i=0; i<6; i++) {
      item.rotationType = i;
      let d = item.getDimension();

      if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {
        continue;
      }

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

      return fit;
    }

    return fit;
  }

}
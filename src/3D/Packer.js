import Bin from './Bin';
import {
  Item,
  StartPosition,
  WidthAxis,
  HeightAxis,
  DepthAxis
} from './Item';

export default class Packer {

  bins = [];
  items = [];
  unfitItems = [];

  addBin(bin) {
    this.bins.push(bin);
  }

  addItem(item) {
    this.items.push(item);
  }

  findFittedBin(i) {
    for (let _i=0; _i<this.bins.length; _i++) {
      let b = this.bins[_i];

      if (!b.weighItem(i) || !b.putItem(i, StartPosition)) {
        continue;
      }

      if (b.items.length === 1 && b.items[0] === i) {
        b.items = [];
      }

      return b;
    }
    return null;
  }

  getBiggerBinThan(b) {
    let v = b.getVolume();
    for (let _i=0; _i<this.bins; _i++) {
      let b2 = this.bins[_i];
      if (b2.getVolume() > v) {
        return b2;
      }
    }
    return null;
  }

  unfitItem() {
    if (this.items.length === 0) {
      return;
    }
    this.unfitItems.push(this.items[0]);
    this.items.splice(0, 1);
  }

  packToBin(b, items) {
    let b2 = null;
    let unpacked = [];
    let fit = b.weighItem(items[0]) && b.putItem(items[0], StartPosition);

    if (!fit) {
      let b2 = this.getBiggerBinThan(b);
      if (b2) {
        return this.packToBin(b2, items);
      }
      return this.items;
    }

    // Pack unpacked items.
    for (let _i=1; _i < this.items.length; _i++) {
      let fitted = false;
      let item = this.items[_i];

      if (b.weighItem(item)) {
        // Try available pivots in current bin that are not intersect with
        // existing items in current bin.
        lookup:
        for (let _pt=0; _pt < 3; _pt++) {
          for (let _j=0; _j < b.items.length; _j++) {
            let pv;
            let ib = b.items[_j];
            let d = ib.getDimension();
            switch (_pt) {
              case WidthAxis:
                pv = [ib.position[0] + d[0], ib.position[1], ib.position[2]];
                break;
              case HeightAxis:
                pv = [ib.position[0], ib.position[1] + d[1], ib.position[2]];
                break;
              case DepthAxis:
                pv = [ib.position[0], ib.position[1], ib.position[2] + d[2]];
                break;
            }

            if (b.putItem(item, pv)) {
              fitted = true;
              break lookup;
            }
          }
        }
      }

      if (!fitted) {
        while (b2 !== null) {
          b2 = this.getBiggerBinThan(b);
          if (b2) {
            b2.items.push(item);
            let left = this.packToBin(b2, b2.items);
            if (left.length === 0) {
              b = b2;
              fitted = true;
              break;
            }
          }
        }

        if (!fitted) {
          unpacked.push(item);
        }
      }
    }

    return unpacked;
  }

  pack() {
    // Sort bins smallest to largest.
    this.bins.sort((a, b) => {
      return a.getVolume() - b.getVolume();
    });

    // Sort items largest to smallest.
    this.items.sort((a, b) => {
      return b.getVolume() - a.getVolume();
    });

    while (this.items.length > 0) {
      let bin = this.findFittedBin(this.items[0]);

      if (bin === null) {
        this.unfitItem();
        continue;
      }

      this.items = this.packToBin(bin, this.items);
    }

    return null;
  }
}

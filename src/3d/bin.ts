import { RotationType, ALL_ROTATIONS, type Bin3D, type Item3D, type PackedItem3D } from './types';
import { factoredInteger } from '../lib/factor';
import { getDimension, itemsIntersect, getVolume } from './item';
import { createLogger } from '../lib/log';

const log = createLogger('3D:');

interface NormalizedBin {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly maxWeight: number;
}

export function normalizeBin(bin: Bin3D, factor: number): NormalizedBin {
  return {
    name: bin.name,
    width: factoredInteger(bin.width, factor),
    height: factoredInteger(bin.height, factor),
    depth: factoredInteger(bin.depth, factor),
    maxWeight: factoredInteger(bin.maxWeight, factor),
  };
}

export function binVolume(bin: NormalizedBin): number {
  return bin.width * bin.height * bin.depth;
}

export function scoreRotation(
  bin: NormalizedBin,
  itemWidth: number,
  itemHeight: number,
  itemDepth: number,
  rotation: RotationType
): number {
  const d = getDimension(itemWidth, itemHeight, itemDepth, rotation);
  if (bin.width < d[0] || bin.height < d[1] || bin.depth < d[2]) {
    return 0;
  }

  const widthEfficiency = Math.floor(bin.width / d[0]) * d[0] / bin.width;
  const heightEfficiency = Math.floor(bin.height / d[1]) * d[1] / bin.height;
  const depthEfficiency = Math.floor(bin.depth / d[2]) * d[2] / bin.depth;

  return widthEfficiency * heightEfficiency * depthEfficiency;
}

export function getBestRotationOrder(
  bin: NormalizedBin,
  itemWidth: number,
  itemHeight: number,
  itemDepth: number,
  allowedRotations: readonly RotationType[]
): RotationType[] {
  const scores = allowedRotations.map((r) => ({
    rotation: r,
    score: scoreRotation(bin, itemWidth, itemHeight, itemDepth, r),
  }));

  return scores
    .sort((a, b) => b.score - a.score)
    .map((s) => s.rotation);
}

export class MutableBin3D {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly maxWeight: number;
  items: PackedItem3D[] = [];

  constructor(bin: NormalizedBin) {
    this.name = bin.name;
    this.width = bin.width;
    this.height = bin.height;
    this.depth = bin.depth;
    this.maxWeight = bin.maxWeight;
  }

  getVolume(): number {
    return this.width * this.height * this.depth;
  }

  getPackedWeight(): number {
    return this.items.reduce((w, item) => w + item.weight, 0);
  }

  weighItem(weight: number): boolean {
    if (this.maxWeight === 0) return false;
    return this.maxWeight === Infinity || weight + this.getPackedWeight() <= this.maxWeight;
  }

  putItem(
    sourceItem: Item3D,
    itemWidth: number,
    itemHeight: number,
    itemDepth: number,
    itemWeight: number,
    position: readonly [number, number, number],
    allowedRotations: readonly RotationType[]
  ): PackedItem3D | null {
    const rotations = getBestRotationOrder(this, itemWidth, itemHeight, itemDepth, allowedRotations);

    for (const rotation of rotations) {
      const d = getDimension(itemWidth, itemHeight, itemDepth, rotation);

      if (
        this.width < position[0] + d[0] ||
        this.height < position[1] + d[1] ||
        this.depth < position[2] + d[2]
      ) {
        continue;
      }

      let fits = true;
      for (const existing of this.items) {
        if (itemsIntersect(position, d, existing.position, existing.dimension)) {
          fits = false;
          break;
        }
      }

      if (fits) {
        const packed: PackedItem3D = {
          name: sourceItem.name,
          width: itemWidth,
          height: itemHeight,
          depth: itemDepth,
          weight: itemWeight,
          position: [position[0], position[1], position[2]],
          rotationType: rotation,
          dimension: [d[0], d[1], d[2]],
          sourceItem,
        };
        this.items.push(packed);
        log('putItem success', packed.name, 'at', packed.position, 'dim', packed.dimension);
        return packed;
      }
    }

    return null;
  }
}

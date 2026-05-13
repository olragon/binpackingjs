import {
  RotationType,
  ALL_ROTATIONS,
  START_POSITION,
  Axis,
  type Item3D,
  type Bin3D,
  type Pack3DOptions,
  type Pack3DResult,
  type PackedBin3D,
  type PackedItem3D,
} from './types';
import { factoredInteger } from './util';
import { normalizeItem, getDimension, getVolume } from './item';
import { MutableBin3D, normalizeBin, binVolume } from './bin';

interface NormalizedItem {
  readonly source: Item3D;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly weight: number;
  readonly allowedRotations: readonly RotationType[];
}

function normalize(item: Item3D): NormalizedItem {
  const n = normalizeItem(item);
  return {
    source: item,
    width: n.width,
    height: n.height,
    depth: n.depth,
    weight: n.weight,
    allowedRotations: item.allowedRotations ?? ALL_ROTATIONS,
  };
}

function findFittedBin(
  bins: MutableBin3D[],
  item: NormalizedItem
): MutableBin3D | null {
  for (const b of bins) {
    if (!b.weighItem(item.weight)) continue;
    const startPos: [number, number, number] = [0, 0, 0];
    const result = b.putItem(
      item.source,
      item.width,
      item.height,
      item.depth,
      item.weight,
      startPos,
      item.allowedRotations
    );
    if (result) {
      b.items.pop();
      return b;
    }
  }
  return null;
}

function getBiggerBinThan(bins: MutableBin3D[], b: MutableBin3D): MutableBin3D | null {
  const v = b.getVolume();
  for (const b2 of bins) {
    if (b2.getVolume() > v) {
      return b2;
    }
  }
  return null;
}

function packToBin(
  bins: MutableBin3D[],
  b: MutableBin3D,
  items: NormalizedItem[]
): NormalizedItem[] {
  const firstItem = items[0];
  if (!firstItem) return [];

  if (!b.weighItem(firstItem.weight)) {
    const b2 = getBiggerBinThan(bins, b);
    if (b2) return packToBin(bins, b2, items);
    return items;
  }

  const startPos: [number, number, number] = [0, 0, 0];
  const fit = b.putItem(
    firstItem.source,
    firstItem.width,
    firstItem.height,
    firstItem.depth,
    firstItem.weight,
    startPos,
    firstItem.allowedRotations
  );

  if (!fit) {
    const b2 = getBiggerBinThan(bins, b);
    if (b2) return packToBin(bins, b2, items);
    return items;
  }

  const unpacked: NormalizedItem[] = [];

  for (let i = 1; i < items.length; i++) {
    const item = items[i]!;
    let fitted = false;

    if (b.weighItem(item.weight)) {
      lookup: for (let pt = 0; pt < 3; pt++) {
        for (const ib of b.items) {
          let pv: [number, number, number];
          const d = ib.dimension;

          switch (pt) {
            case Axis.Width:
              pv = [ib.position[0] + d[0], ib.position[1], ib.position[2]];
              break;
            case Axis.Height:
              pv = [ib.position[0], ib.position[1] + d[1], ib.position[2]];
              break;
            case Axis.Depth:
              pv = [ib.position[0], ib.position[1], ib.position[2] + d[2]];
              break;
            default:
              continue;
          }

          const result = b.putItem(
            item.source,
            item.width,
            item.height,
            item.depth,
            item.weight,
            pv,
            item.allowedRotations
          );

          if (result) {
            fitted = true;
            break lookup;
          }
        }
      }
    }

    if (!fitted) {
      unpacked.push(item);
    }
  }

  return unpacked;
}

export function pack3D(options: Pack3DOptions): Pack3DResult {
  const normalizedBins = options.bins
    .map((bin) => ({ source: bin, normalized: normalizeBin(bin) }))
    .sort((a, b) => binVolume(a.normalized) - binVolume(b.normalized));

  let items = options.items
    .map(normalize)
    .sort((a, b) => getVolume(b.width, b.height, b.depth) - getVolume(a.width, a.height, a.depth));

  const mutableBins = normalizedBins.map((b) => new MutableBin3D(b.normalized));
  const unfitItems: Item3D[] = [];

  while (items.length > 0) {
    const firstItem = items[0]!;
    const bin = findFittedBin(mutableBins, firstItem);

    if (!bin) {
      unfitItems.push(firstItem.source);
      items = items.slice(1);
      continue;
    }

    items = packToBin(mutableBins, bin, items);
  }

  const packedBins: PackedBin3D[] = mutableBins.map((mb, i) => ({
    name: mb.name,
    width: normalizedBins[i]!.source.width,
    height: normalizedBins[i]!.source.height,
    depth: normalizedBins[i]!.source.depth,
    maxWeight: normalizedBins[i]!.source.maxWeight,
    items: mb.items,
    volume: mb.getVolume(),
  }));

  return { packedBins, unfitItems };
}

export class Packer3D {
  private bins: Bin3D[] = [];
  private items: Item3D[] = [];

  addBin(bin: Bin3D): void {
    this.bins.push(bin);
  }

  addItem(item: Item3D): void {
    this.items.push(item);
  }

  pack(): Pack3DResult {
    return pack3D({ bins: this.bins, items: this.items });
  }
}

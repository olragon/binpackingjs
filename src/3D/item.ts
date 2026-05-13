import { RotationType, Axis, type Item3D, type PackedItem3D } from './types';
import { factoredInteger } from './util';

export function getDimension(
  width: number,
  height: number,
  depth: number,
  rotation: RotationType
): [number, number, number] {
  switch (rotation) {
    case RotationType.WHD:
      return [width, height, depth];
    case RotationType.HWD:
      return [height, width, depth];
    case RotationType.HDW:
      return [height, depth, width];
    case RotationType.DHW:
      return [depth, height, width];
    case RotationType.DWH:
      return [depth, width, height];
    case RotationType.WDH:
      return [width, depth, height];
  }
}

export function rectIntersect(
  i1Pos: readonly number[],
  i1Dim: readonly number[],
  i2Pos: readonly number[],
  i2Dim: readonly number[],
  x: Axis,
  y: Axis
): boolean {
  const cx1 = i1Pos[x]! + i1Dim[x]! / 2;
  const cy1 = i1Pos[y]! + i1Dim[y]! / 2;
  const cx2 = i2Pos[x]! + i2Dim[x]! / 2;
  const cy2 = i2Pos[y]! + i2Dim[y]! / 2;

  const ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);
  const iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);

  return ix < (i1Dim[x]! + i2Dim[x]!) / 2 && iy < (i1Dim[y]! + i2Dim[y]!) / 2;
}

export function itemsIntersect(
  pos1: readonly number[],
  dim1: readonly number[],
  pos2: readonly number[],
  dim2: readonly number[]
): boolean {
  return (
    rectIntersect(pos1, dim1, pos2, dim2, Axis.Width, Axis.Height) &&
    rectIntersect(pos1, dim1, pos2, dim2, Axis.Height, Axis.Depth) &&
    rectIntersect(pos1, dim1, pos2, dim2, Axis.Width, Axis.Depth)
  );
}

export function normalizeItem(item: Item3D): {
  width: number;
  height: number;
  depth: number;
  weight: number;
} {
  return {
    width: factoredInteger(item.width),
    height: factoredInteger(item.height),
    depth: factoredInteger(item.depth),
    weight: factoredInteger(item.weight),
  };
}

export function getVolume(width: number, height: number, depth: number): number {
  return width * height * depth;
}

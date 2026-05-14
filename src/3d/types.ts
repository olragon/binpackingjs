export enum RotationType {
  WHD = 0,
  HWD = 1,
  HDW = 2,
  DHW = 3,
  DWH = 4,
  WDH = 5,
}

export const ALL_ROTATIONS: readonly RotationType[] = [
  RotationType.WHD,
  RotationType.HWD,
  RotationType.HDW,
  RotationType.DHW,
  RotationType.DWH,
  RotationType.WDH,
];

export enum Axis {
  Width = 0,
  Height = 1,
  Depth = 2,
}

export const START_POSITION: readonly [number, number, number] = [0, 0, 0];

export interface Item3D {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly weight: number;
  readonly allowedRotations?: readonly RotationType[];
}

export interface Bin3D {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly maxWeight: number;
}

export interface PackedItem3D {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly weight: number;
  readonly position: readonly [number, number, number];
  readonly rotationType: RotationType;
  readonly dimension: readonly [number, number, number];
  readonly sourceItem: Item3D;
}

export interface PackedBin3D {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly depth: number;
  readonly maxWeight: number;
  readonly items: readonly PackedItem3D[];
  readonly volume: number;
}

export interface Pack3DOptions {
  readonly bins: readonly Bin3D[];
  readonly items: readonly Item3D[];
  readonly factor?: number;
}

export interface Pack3DResult {
  readonly packedBins: readonly PackedBin3D[];
  readonly unfitItems: readonly Item3D[];
}

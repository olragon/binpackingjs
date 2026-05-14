export interface Box2D {
  readonly width: number;
  readonly height: number;
  readonly constrainRotation?: boolean;
}

export interface Bin2D {
  readonly width: number;
  readonly height: number;
}

export interface PlacementResult {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface PackedBox2D {
  readonly width: number;
  readonly height: number;
  readonly x: number;
  readonly y: number;
  readonly rotated: boolean;
  readonly sourceBox: Box2D;
}

export interface PackedBin2D {
  readonly width: number;
  readonly height: number;
  readonly boxes: readonly PackedBox2D[];
  readonly efficiency: number;
}

export interface FreeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Pack2DOptions {
  readonly bins: readonly Bin2D[];
  readonly boxes: readonly Box2D[];
  readonly heuristic?: import('./heuristics/types').Heuristic;
  readonly limit?: number | undefined;
  readonly factor?: number;
}

export interface Pack2DResult {
  readonly packedBins: readonly PackedBin2D[];
  readonly unpackedBoxes: readonly Box2D[];
}

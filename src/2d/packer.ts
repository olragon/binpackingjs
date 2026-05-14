import type {
  Bin2D,
  Box2D,
  Pack2DOptions,
  Pack2DResult,
  PackedBin2D,
  PackedBox2D,
  PlacementResult,
} from './types';
import type { Heuristic as HeuristicInterface } from './heuristics/types';
import { BestShortSideFit } from './heuristics/best-short-side-fit';
import { FreeRectManager } from './free-rect-manager';
import { findBestEntry } from './scoreboard';
import { computeFactor, factoredInteger, toOriginal } from '../lib/factor';

interface WorkingBin {
  readonly source: Bin2D;
  readonly width: number;
  readonly height: number;
  readonly freeRects: FreeRectManager;
  readonly heuristic: HeuristicInterface;
  readonly packedBoxes: PackedBox2D[];
}

export function pack2D(options: Pack2DOptions): Pack2DResult {
  const { bins, boxes, heuristic, limit } = options;
  const defaultHeuristic = heuristic ?? new BestShortSideFit();

  const allValues: number[] = [];
  for (const bin of bins) {
    allValues.push(bin.width, bin.height);
  }
  for (const box of boxes) {
    allValues.push(box.width, box.height);
  }
  const factor = options.factor ?? computeFactor(allValues);

  const factoredBoxes: Box2D[] = boxes.map((box) => {
    const fb: Box2D = {
      width: factoredInteger(box.width, factor),
      height: factoredInteger(box.height, factor),
      ...(box.constrainRotation !== undefined && { constrainRotation: box.constrainRotation }),
    };
    return fb;
  });

  const workingBins: WorkingBin[] = bins.map((bin) => {
    const w = factoredInteger(bin.width, factor);
    const h = factoredInteger(bin.height, factor);
    return {
      source: bin,
      width: w,
      height: h,
      freeRects: new FreeRectManager(w, h),
      heuristic: defaultHeuristic,
      packedBoxes: [],
    };
  });

  const packedFlags = new Array<boolean>(boxes.length).fill(false);
  let packedCount = 0;
  const maxPack = limit ?? boxes.length;

  while (packedCount < maxPack) {
    const entry = findBestEntry(workingBins, factoredBoxes, packedFlags);
    if (!entry) break;

    const bin = workingBins[entry.binIndex]!;
    const fBox = factoredBoxes[entry.boxIndex]!;

    const placement = bin.heuristic.findPosition(
      fBox.width,
      fBox.height,
      bin.freeRects.getRects(),
      fBox.constrainRotation
    );

    if (!placement) break;

    bin.freeRects.insert(placement);

    const sourceBox = boxes[entry.boxIndex]!;
    const rotated =
      placement.width !== fBox.width || placement.height !== fBox.height;

    const defactor = (v: number) => toOriginal(v, factor);
    bin.packedBoxes.push({
      width: rotated ? sourceBox.height : sourceBox.width,
      height: rotated ? sourceBox.width : sourceBox.height,
      x: defactor(placement.x),
      y: defactor(placement.y),
      rotated,
      sourceBox,
    });

    packedFlags[entry.boxIndex] = true;
    packedCount++;
  }

  const packedBins: PackedBin2D[] = workingBins.map((wb) => {
    const binArea = wb.source.width * wb.source.height;
    const boxesArea = wb.packedBoxes.reduce(
      (sum, b) => sum + b.width * b.height,
      0
    );
    return {
      width: wb.source.width,
      height: wb.source.height,
      boxes: wb.packedBoxes,
      efficiency: binArea > 0 ? (boxesArea * 100) / binArea : 0,
    };
  });

  const unpackedBoxes = boxes.filter((_, i) => !packedFlags[i]);

  return { packedBins, unpackedBoxes };
}

export class Packer2D {
  private bins: Bin2D[];
  private heuristic: HeuristicInterface;

  constructor(bins: Bin2D[] = [], heuristic?: HeuristicInterface) {
    this.bins = bins;
    this.heuristic = heuristic ?? new BestShortSideFit();
  }

  pack(boxes: Box2D[], options?: { limit?: number }): Pack2DResult {
    return pack2D({
      bins: this.bins,
      boxes,
      heuristic: this.heuristic,
      limit: options?.limit,
    });
  }
}

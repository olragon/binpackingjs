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

  const workingBins: WorkingBin[] = bins.map((bin) => ({
    source: bin,
    width: bin.width,
    height: bin.height,
    freeRects: new FreeRectManager(bin.width, bin.height),
    heuristic: defaultHeuristic,
    packedBoxes: [],
  }));

  const packedFlags = new Array<boolean>(boxes.length).fill(false);
  let packedCount = 0;
  const maxPack = limit ?? boxes.length;

  while (packedCount < maxPack) {
    const entry = findBestEntry(workingBins, boxes, packedFlags);
    if (!entry) break;

    const bin = workingBins[entry.binIndex]!;
    const box = boxes[entry.boxIndex]!;

    const placement = bin.heuristic.findPosition(
      box.width,
      box.height,
      bin.freeRects.getRects(),
      box.constrainRotation
    );

    if (!placement) break;

    bin.freeRects.insert(placement);

    const rotated =
      placement.width !== box.width || placement.height !== box.height;

    bin.packedBoxes.push({
      width: placement.width,
      height: placement.height,
      x: placement.x,
      y: placement.y,
      rotated,
      sourceBox: box,
    });

    packedFlags[entry.boxIndex] = true;
    packedCount++;
  }

  const packedBins: PackedBin2D[] = workingBins.map((wb) => {
    const binArea = wb.width * wb.height;
    const boxesArea = wb.packedBoxes.reduce(
      (sum, b) => sum + b.width * b.height,
      0
    );
    return {
      width: wb.width,
      height: wb.height,
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

import { Score } from './score';
import { ScoreBoardEntry } from './scoreboard-entry';
import type { Heuristic as HeuristicInterface } from './heuristics/types';
import type { Box2D } from './types';
import { FreeRectManager } from './free-rect-manager';
import { BestShortSideFit } from './heuristics/best-short-side-fit';

interface InternalBin {
  readonly width: number;
  readonly height: number;
  readonly freeRects: FreeRectManager;
  readonly heuristic: HeuristicInterface;
}

export function findBestEntry(
  bins: readonly InternalBin[],
  boxes: readonly Box2D[],
  packedFlags: readonly boolean[]
): ScoreBoardEntry | null {
  let bestEntry: ScoreBoardEntry | null = null;
  let bestScore = Score.MAX;

  for (let bi = 0; bi < bins.length; bi++) {
    const bin = bins[bi]!;

    for (let boxi = 0; boxi < boxes.length; boxi++) {
      if (packedFlags[boxi]) continue;

      const box = boxes[boxi]!;
      if (box.width > bin.width && box.height > bin.width) continue;
      if (box.width > bin.height && box.height > bin.height) continue;

      const freeRectsCopy = bin.freeRects.clone();
      const placement = bin.heuristic.findPosition(
        box.width,
        box.height,
        freeRectsCopy.getRects(),
        box.constrainRotation
      );

      if (placement && placement.score.isBetterThan(bestScore)) {
        bestScore = placement.score;
        bestEntry = new ScoreBoardEntry(bi, boxi, placement.score);
      }
    }
  }

  return bestEntry;
}

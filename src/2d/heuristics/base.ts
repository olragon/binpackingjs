import { Score } from '../score';
import type { FreeRect } from '../types';
import type { Heuristic, HeuristicCalculator, ScoredPlacement } from './types';

export abstract class BaseHeuristic implements Heuristic, HeuristicCalculator {
  abstract calculateScore(freeRect: FreeRect, rectWidth: number, rectHeight: number): Score;

  findPosition(
    boxWidth: number,
    boxHeight: number,
    freeRects: readonly FreeRect[],
    constrainRotation?: boolean
  ): ScoredPlacement | null {
    let bestScore = Score.MAX;
    let bestPlacement: ScoredPlacement | null = null;

    for (const freeRect of freeRects) {
      const normal = this.tryFit(freeRect, boxWidth, boxHeight);
      if (normal && normal.score.isBetterThan(bestScore)) {
        bestScore = normal.score;
        bestPlacement = normal;
      }

      if (!constrainRotation) {
        const rotated = this.tryFit(freeRect, boxHeight, boxWidth);
        if (rotated && rotated.score.isBetterThan(bestScore)) {
          bestScore = rotated.score;
          bestPlacement = rotated;
        }
      }
    }

    return bestPlacement;
  }

  private tryFit(
    freeRect: FreeRect,
    rectWidth: number,
    rectHeight: number
  ): ScoredPlacement | null {
    if (rectWidth > freeRect.width || rectHeight > freeRect.height) {
      return null;
    }

    const score = this.calculateScore(freeRect, rectWidth, rectHeight);
    return {
      x: freeRect.x,
      y: freeRect.y,
      width: rectWidth,
      height: rectHeight,
      score,
    };
  }
}

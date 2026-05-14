import type { FreeRect, PlacementResult } from '../types';
import type { Score } from '../score';

export interface ScoredPlacement extends PlacementResult {
  readonly score: Score;
}

export interface Heuristic {
  findPosition(
    boxWidth: number,
    boxHeight: number,
    freeRects: readonly FreeRect[],
    constrainRotation?: boolean
  ): ScoredPlacement | null;
}

export interface HeuristicCalculator {
  calculateScore(freeRect: FreeRect, rectWidth: number, rectHeight: number): Score;
}

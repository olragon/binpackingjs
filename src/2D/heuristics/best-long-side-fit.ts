import { Score } from '../score';
import type { FreeRect } from '../types';
import { BaseHeuristic } from './base';

export class BestLongSideFit extends BaseHeuristic {
  calculateScore(freeRect: FreeRect, rectWidth: number, rectHeight: number): Score {
    const leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    const leftOverVert = Math.abs(freeRect.height - rectHeight);
    const longSide = Math.max(leftOverHoriz, leftOverVert);
    const shortSide = Math.min(leftOverHoriz, leftOverVert);
    return new Score(longSide, shortSide);
  }
}

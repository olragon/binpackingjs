import { Score } from '../score';
import type { FreeRect } from '../types';
import { BaseHeuristic } from './base';

export class BestShortSideFit extends BaseHeuristic {
  calculateScore(freeRect: FreeRect, rectWidth: number, rectHeight: number): Score {
    const leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    const leftOverVert = Math.abs(freeRect.height - rectHeight);
    const shortSide = Math.min(leftOverHoriz, leftOverVert);
    const longSide = Math.max(leftOverHoriz, leftOverVert);
    return new Score(shortSide, longSide);
  }
}

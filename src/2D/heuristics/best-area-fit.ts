import { Score } from '../score';
import type { FreeRect } from '../types';
import { BaseHeuristic } from './base';

export class BestAreaFit extends BaseHeuristic {
  calculateScore(freeRect: FreeRect, rectWidth: number, rectHeight: number): Score {
    const areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;
    const leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    const leftOverVert = Math.abs(freeRect.height - rectHeight);
    const shortSide = Math.min(leftOverHoriz, leftOverVert);
    return new Score(areaFit, shortSide);
  }
}

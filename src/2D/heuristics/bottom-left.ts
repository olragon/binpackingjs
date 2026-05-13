import { Score } from '../score';
import type { FreeRect } from '../types';
import { BaseHeuristic } from './base';

export class BottomLeft extends BaseHeuristic {
  calculateScore(freeRect: FreeRect, _rectWidth: number, rectHeight: number): Score {
    return new Score(freeRect.y + rectHeight, freeRect.x);
  }
}

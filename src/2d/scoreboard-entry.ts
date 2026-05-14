import type { Score } from './score';

export class ScoreBoardEntry {
  constructor(
    readonly binIndex: number,
    readonly boxIndex: number,
    readonly score: Score
  ) {}
}

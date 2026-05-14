export class Score {
  static readonly MAX_INT = Number.MAX_SAFE_INTEGER;
  static readonly MAX = new Score(Score.MAX_INT, Score.MAX_INT);

  constructor(
    readonly score1: number,
    readonly score2: number
  ) {}

  isBlank(): boolean {
    return this.score1 === Score.MAX_INT;
  }

  isBetterThan(other: Score): boolean {
    if (this.score1 < other.score1) return true;
    if (this.score1 === other.score1 && this.score2 < other.score2) return true;
    return false;
  }

  subtract(delta: number): Score {
    return new Score(this.score1 - delta, this.score2 - delta);
  }
}

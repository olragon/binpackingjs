export default class Score {

  static MAX_INT = Number.MAX_SAFE_INTEGER;
  score_1 = 0;
  score_2 = 0;

  constructor(score_1, score_2) {
    this.score_1 = score_1 || 0;
    this.score_2 = score_2 || 0;
  }

  compare(other) {
    if (this.score_1 > other.score_1 || (this.score_1 === other.score_1 && this.score_2 > other.score_2))
      return -1;
    else if (this.score_1 < other.score_1 || (this.score_1 === other.score_1 && this.score_2 < other.score_2))
      return 1;
    else
      return 0;
  }

  assign(other) {
    this.score_1 = other.score_1;
    this.score_2 = other.score_2;
  }

  isBlank() {
    return this.score_1 === 0;
  }

  decreaseBy(delta) {
    this.score_1 += delta;
    this.score_2 += delta;
  }

}
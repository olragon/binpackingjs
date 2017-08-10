export default class Score {

  static MAX_INT = Number.MAX_SAFE_INTEGER;
  score_1 = Score.MAX_INT;
  score_2 = Score.MAX_INT;

  constructor(score_1, score_2) {
    if (typeof score_1 != 'undefined') this.score_1 = score_1;
    if (typeof score_2 != 'undefined') this.score_2 = score_2;
  }

  /**
   * Lower is better
   */
  valueOf() {
    return (this.score_1 + this.score_2);
  }

  assign(other) {
    this.score_1 = other.score_1;
    this.score_2 = other.score_2;
  }

  isBlank() {
    return this.score_1 === Score.MAX_INT;
  }

  decreaseBy(delta) {
    this.score_1 += delta;
    this.score_2 += delta;
  }

}
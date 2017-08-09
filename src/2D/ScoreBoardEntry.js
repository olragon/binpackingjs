export default class ScoreBoardEntry {

  bin = null
  box = null
  score = null

  constructor(bin, box) {
    this.bin = bin
    this.box = box
  }

  calculate() {
    this.score = this.bin.scoreFor(this.box);
    return this.score;
  }

  fit() {
    return !this.score.isBlank();
  }

}
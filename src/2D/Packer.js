import Score from './Score';
import ScoreBoard from './ScoreBoard';

export default class Packer {

  bins = [];
  unpackedBoxes = [];

  constructor(bins) {
    this.bins = bins;
  }

  pack(boxes, options = {}) {
    let packedBoxes = [];
    let entry;
    
    boxes = boxes.filter((box) => !box.packed);
    if (boxes.length === 0) return packedBoxes;

    let limit = options.limit || Score.MAX_INT;
    let board = new ScoreBoard(this.bins, boxes);
    let r = 0;
    while(entry = board.bestFit()) {
      entry.bin.insert(entry.box);
      board.removeBox(entry.box);
      board.recalculateBin(entry.bin);
      packedBoxes.push(entry.box);
      if (packedBoxes.length >= limit) {
        break;
      }
    };

    this.unpackedBoxes = boxes.filter((box) => {
      return !box.packed;
    });

    return packedBoxes;
  }

}
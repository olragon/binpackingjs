import Base from './Base';
import Score from '../Score';

export default class BestShortSideFit extends Base {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b);
    let score = new Score(args[0], args[1]);
    return score;
  }

}
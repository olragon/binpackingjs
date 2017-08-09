import Base from './Base';
import Score from '../Score';

export default class BottomLeft extends Base {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let topSideY = freeRect.y + rectHeight;
    return new Score(topSideY, freeRect.x);
  }

}
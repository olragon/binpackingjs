import Base from './Base';
import Score from '../Score';

export default class BestAreaFit extends Base {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let shortSideFit = Math.min(leftOverHoriz, leftOverVert);
    return new Score(areaFit, shortSideFit);
  }

}
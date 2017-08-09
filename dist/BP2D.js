(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BinPacking", [], factory);
	else if(typeof exports === 'object')
		exports["BinPacking"] = factory();
	else
		root["BinPacking"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Score {

  constructor(score_1, score_2) {
    this.score_1 = 0;
    this.score_2 = 0;

    this.score_1 = score_1 || 0;
    this.score_2 = score_2 || 0;
  }

  compare(other) {
    if (this.score_1 > other.score_1 || this.score_1 === other.score_1 && this.score_2 > other.score_2) return -1;else if (this.score_1 < other.score_1 || this.score_1 === other.score_1 && this.score_2 < other.score_2) return 1;else return 0;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Score;

Score.MAX_INT = Number.MAX_SAFE_INTEGER;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bin__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Packer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__heuristics__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Bin", function() { return __WEBPACK_IMPORTED_MODULE_0__Bin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return __WEBPACK_IMPORTED_MODULE_1__Box__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Packer", function() { return __WEBPACK_IMPORTED_MODULE_2__Packer__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "heuristics", function() { return __WEBPACK_IMPORTED_MODULE_3__heuristics__; });







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heuristics_BestShortSideFit__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



class Bin {

  constructor(width, height, heuristic) {
    this.width = null;
    this.height = null;
    this.boxes = [];
    this.heuristic = null;
    this.freeRectangles = [];

    this.width = width;
    this.height = height;
    this.freeRectangles = [new FreeSpaceBox(width, height)];
    this.heuristic = heuristic || new __WEBPACK_IMPORTED_MODULE_0__heuristics_BestShortSideFit__["a" /* default */]();
    this.area = width * height;
  }

  get efficiency() {
    let boxesArea = 0;
    this.boxes.forEach(box => {
      boxesArea += box.area;
    });
    return boxesArea * 100 / this.area;
  }

  insert(box) {
    if (box.packed) return false;

    this.heuristic.findPositionForNewNode(box, this.freeRectangles);
    if (!box.packed) return false;
    let numRectanglesToProcess = this.freeRectangles.length;
    let i = 0;

    while (i < numRectanglesToProcess) {
      if (this.splitFreeNode(this.freeRectangles[i], box)) {
        this.freeRectangles.splice(i, 1);
        numRectanglesToProcess--;
      } else {
        i++;
      }
    }

    this.pruneFreeList();
    this.boxes.push(box);

    return true;
  }

  scoreFor(box) {
    return this.heuristic.findPositionForNewNode(_extends({}, box), this.freeRectangles);
  }

  isLargerThan(box) {
    return this.width >= box.width && this.height >= box.height || this.height >= box.width && this.width >= box.height;
  }

  label() {
    return `${this.width}x${this.height} ${this.efficiency}%`;
  }

  splitFreeNode(freeNode, usedNode) {
    // Test with SAT if the rectangles even intersect.
    if (usedNode.x >= freeNode.x + freeNode.width || usedNode.x + usedNode.width <= freeNode.x || usedNode.y >= freeNode.y + freeNode.height || usedNode.y + usedNode.height <= freeNode.y) {
      return false;
    }

    this.trySplitFreeNodeVertically(freeNode, usedNode);
    this.trySplitFreeNodeHorizontally(freeNode, usedNode);

    return true;
  }

  trySplitFreeNodeVertically(freeNode, usedNode) {
    if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width < freeNode.x) {
      this.tryLeaveFreeSpaceAtTop(freeNode, usedNode);
      this.tryLeaveFreeSpaceAtBottom(freeNode, usedNode);
    }
  }

  tryLeaveFreeSpaceAtTop(freeNode, usedNode) {
    if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
      let newNode = _extends({}, freeNode);
      newNode.height = usedNode.y - newNode.y;
      this.freeRectangles.push(newNode);
    }
  }

  tryLeaveFreeSpaceAtBottom(freeNode, usedNode) {
    if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
      let newNode = _extends({}, freeNode);
      newNode.y = usedNode.y + usedNode.height;
      newNode.height = freeNode.y + freeNode.height - (usedNode.y + usedNode.height);
      this.freeRectangles.push(newNode);
    }
  }

  trySplitFreeNodeHorizontally(freeNode, usedNode) {
    if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y) {
      this.tryLeaveFreeSpaceOnLeft(freeNode, usedNode);
      this.tryLeaveFreeSpaceOnRight(freeNode, usedNode);
    }
  }

  tryLeaveFreeSpaceOnLeft(freeNode, usedNode) {
    if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
      let newNode = _extends({}, freeNode);
      newNode.width = usedNode.x - newNode.y;
      this.freeRectangles.push(newNode);
    }
  }

  tryLeaveFreeSpaceOnRight(freeNode, usedNode) {
    if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
      let newNode = _extends({}, freeNode);
      newNode.x = usedNode.x + usedNode.width;
      newNode.width = freeNode.x + freeNode.width - (usedNode.x + usedNode.width);
      this.freeRectangles.push(newNode);
    }
  }

  /**
   * Goes through the free rectangle list and removes any redundant entries.
   */
  pruneFreeList() {
    let i = 0;
    while (i < this.freeRectangles.length) {
      let j = i + 1;
      if (j === this.freeRectangles.length) {
        break;
      }
      while (j < this.freeRectangles.length) {
        if (this.isContainedIn(this.freeRectangles[i], this.freeRectangles[j])) {
          this.freeRectangles.splice(i, 1);
          i--;
          break;
        }
        if (this.isContainedIn(this.freeRectangles[j], this.freeRectangles[i])) {
          this.freeRectangles.splice(j, 1);
        } else {
          j++;
        }
        i++;
      }
    }
  }

  isContainedIn(rectA, rectB) {
    return rectA.x >= rectB.x && rectA.y >= rectB.y && rectA.x + rectA.width <= rectB.x + rectB.width && rectA.y + rectA.height <= rectB.y + rectB.height;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bin;


class FreeSpaceBox {

  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = null;
    this.height = null;

    this.width = width;
    this.height = height;
  }

}
/* unused harmony export FreeSpaceBox */


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestShortSideFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b);
    let score = new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](args[0], args[1]);
    return score;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestShortSideFit;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Score__ = __webpack_require__(0);


class Base {

  findPositionForNewNode(box, freeRects) {
    let bestScore = new __WEBPACK_IMPORTED_MODULE_0__Score__["a" /* default */]();
    let width = box.width;
    let height = box.height;

    freeRects.forEach(freeRect => {
      this.tryPlaceRectIn(freeRect, box, width, height, bestScore);
      this.tryPlaceRectIn(freeRect, box, height, width, bestScore);
    });

    return bestScore;
  }

  tryPlaceRectIn(freeRect, box, rectWidth, rectHeight, bestScore) {
    if (freeRect.width >= rectWidth && freeRect.height >= rectHeight) {
      let score = this.calculateScore(freeRect, rectWidth, rectHeight);
      if (score.compare(bestScore) <= 0) {
        box.x = freeRect.x;
        box.y = freeRect.y;
        box.width = rectWidth;
        box.height = rectHeight;
        box.packed = true;
        bestScore.assign(score);
      }
    }
  }

  calculateScore(freeRect, rectWidth, rectHeight) {
    throw "NotImplementedError";
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Box {

  constructor(width, height) {
    this.width = null;
    this.height = null;
    this.area = null;
    this.x = 0;
    this.y = 0;
    this.packed = false;

    this.width = width;
    this.height = height;
    this.area = this.width * this.height;
  }

  rotate() {
    let { width, height } = this;
    this.width = height;
    this.height = width;
  }

  label() {
    return `${this.width}x${this.height} at [${this.x},${this.y}]`;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Box;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Score__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScoreBoard__ = __webpack_require__(9);



class Packer {

  constructor(bins) {
    this.bins = [];
    this.unpackedBoxes = [];

    this.bins = bins;
  }

  pack(boxes, options = {}) {
    let packedBoxes = [];
    let entry;
    boxes = boxes.filter(box => !box.packed);
    if (boxes.length === 0) return packedBoxes;

    let limit = options.limit || 100;
    let board = new __WEBPACK_IMPORTED_MODULE_1__ScoreBoard__["a" /* default */](this.bins, boxes);
    while (entry = board.bestFit()) {
      entry.bin.insert(entry.box);
      board.removeBox(entry.box);
      board.recalculateBin(entry.bin);
      packedBoxes.push(entry.box);
      if (packedBoxes.length >= limit) {
        break;
      }
    };

    return packedBoxes;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Packer;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScoreBoardEntry__ = __webpack_require__(10);
// #       box_1 box_2 box_3 ...
// # bin_1  100   200    0
// # bin_2   0     5     0
// # bin_3   9    100    0
// # ...


class ScoreBoard {

  constructor(bins, boxes) {
    this.entries = [];

    bins.forEach(bin => {
      this.addBinEntries(bin, boxes);
    });
  }

  addBinEntries(bin, boxes) {
    boxes.forEach(box => {
      let entry = new __WEBPACK_IMPORTED_MODULE_0__ScoreBoardEntry__["a" /* default */](bin, box);
      entry.calculate();
      this.entries.push(entry);
    });
  }

  any() {
    return this.boxes.some(box => box);
  }

  largestNotFitingBox() {
    let unfit = null;
    let fittingBoxes = this.entries.filter(entry => entry.fit).map(entry => entry.box);

    this.entries.forEach(entry => {
      if (!this.fittingBoxes.contains(entry.box)) {
        return;
      }
      if (unfit === null || unfit.box.area < entry.box.area) {
        this.unfit = entry;
      }
    });

    return unfit.box ? unfit : false;
  }

  bestFit() {
    let best = null;
    for (let i = 0; i < this.entries.length; i++) {
      let entry = this.entries[i];
      if (!entry.fit()) {
        continue;
      }
      if (best === null || entry.score.compare(best.score) <= 0) {
        best = entry;
      }
    }
    return best;
  }

  removeBox(box) {
    this.entries = this.entries.filter(entry => {
      return entry.box !== box;
    });
  }

  addBin(bin) {
    this.addBinEntries(bin, this.currentBoxes());
  }

  recalculateBin(bin) {
    this.entries.filter(entry => entry.bin === bin).forEach(entry => entry.calculate());
  }

  currentBoxes() {
    return [...new Set(this.entries.map(entry => entry.box))];
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreBoard;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ScoreBoardEntry {

  constructor(bin, box) {
    this.bin = null;
    this.box = null;
    this.score = null;

    this.bin = bin;
    this.box = box;
  }

  calculate() {
    this.score = this.bin.scoreFor(this.box);
    return this.score;
  }

  fit() {
    return !this.score.isBlank();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreBoardEntry;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BestAreaFit__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestAreaFit", function() { return __WEBPACK_IMPORTED_MODULE_0__BestAreaFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BestLongSideFit__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestLongSideFit", function() { return __WEBPACK_IMPORTED_MODULE_1__BestLongSideFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BestShortSideFit__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BestShort", function() { return __WEBPACK_IMPORTED_MODULE_2__BestShortSideFit__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BottomLeft__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BottomLeft", function() { return __WEBPACK_IMPORTED_MODULE_3__BottomLeft__["a"]; });





/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestAreaFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let shortSideFit = Math.min(leftOverHoriz, leftOverVert);
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](areaFit, shortSideFit);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestAreaFit;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BestLongSideFit extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);
    let leftOverVert = Math.abs(freeRect.height - rectHeight);
    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b).reverse();
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](args[0], args[1]);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BestLongSideFit;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Score__ = __webpack_require__(0);



class BottomLeft extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {

  calculateScore(freeRect, rectWidth, rectHeight) {
    let topSideY = freeRect.y + rectHeight;
    return new __WEBPACK_IMPORTED_MODULE_1__Score__["a" /* default */](topSideY, freeRect.x);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BottomLeft;


/***/ })
/******/ ]);
});
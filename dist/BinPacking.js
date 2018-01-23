(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BinPacking", [], factory);
	else if(typeof exports === 'object')
		exports["BinPacking"] = factory();
	else
		root["BinPacking"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Score = function () {
  function Score(score_1, score_2) {
    _classCallCheck(this, Score);

    this.score_1 = Score.MAX_INT;
    this.score_2 = Score.MAX_INT;

    if (typeof score_1 != 'undefined') this.score_1 = score_1;
    if (typeof score_2 != 'undefined') this.score_2 = score_2;
  }

  /**
   * Lower is better
   */


  _createClass(Score, [{
    key: 'valueOf',
    value: function valueOf() {
      return this.score_1 + this.score_2;
    }
  }, {
    key: 'assign',
    value: function assign(other) {
      this.score_1 = other.score_1;
      this.score_2 = other.score_2;
    }
  }, {
    key: 'isBlank',
    value: function isBlank() {
      return this.score_1 === Score.MAX_INT;
    }
  }, {
    key: 'decreaseBy',
    value: function decreaseBy(delta) {
      this.score_1 += delta;
      this.score_2 += delta;
    }
  }]);

  return Score;
}();

Score.MAX_INT = Number.MAX_SAFE_INTEGER;
exports.default = Score;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);
  }

  _createClass(Base, [{
    key: "findPositionForNewNode",
    value: function findPositionForNewNode(box, freeRects) {
      var _this = this;

      var bestScore = new _Score2.default();
      var width = box.width;
      var height = box.height;

      freeRects.forEach(function (freeRect) {
        _this.tryPlaceRectIn(freeRect, box, width, height, bestScore);
        _this.tryPlaceRectIn(freeRect, box, height, width, bestScore);
      });

      return bestScore;
    }
  }, {
    key: "tryPlaceRectIn",
    value: function tryPlaceRectIn(freeRect, box, rectWidth, rectHeight, bestScore) {
      if (freeRect.width >= rectWidth && freeRect.height >= rectHeight) {
        var score = this.calculateScore(freeRect, rectWidth, rectHeight);
        if (score < bestScore) {
          box.x = freeRect.x;
          box.y = freeRect.y;
          box.width = rectWidth;
          box.height = rectHeight;
          box.packed = true;
          bestScore.assign(score);
        }
      }
    }
  }, {
    key: "calculateScore",
    value: function calculateScore(freeRect, rectWidth, rectHeight) {
      throw "NotImplementedError";
    }
  }]);

  return Base;
}();

exports.default = Base;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = __webpack_require__(1);

var _Base3 = _interopRequireDefault(_Base2);

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BestShortSideFit = function (_Base) {
  _inherits(BestShortSideFit, _Base);

  function BestShortSideFit() {
    _classCallCheck(this, BestShortSideFit);

    return _possibleConstructorReturn(this, (BestShortSideFit.__proto__ || Object.getPrototypeOf(BestShortSideFit)).apply(this, arguments));
  }

  _createClass(BestShortSideFit, [{
    key: 'calculateScore',
    value: function calculateScore(freeRect, rectWidth, rectHeight) {
      var leftOverHoriz = Math.abs(freeRect.width - rectWidth);
      var leftOverVert = Math.abs(freeRect.height - rectHeight);
      var args = [leftOverHoriz, leftOverVert].sort(function (a, b) {
        return a - b;
      });
      var score = new _Score2.default(args[0], args[1]);
      return score;
    }
  }]);

  return BestShortSideFit;
}(_Base3.default);

exports.default = BestShortSideFit;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
  function Box(width, height) {
    _classCallCheck(this, Box);

    this.width = null;
    this.height = null;
    this.x = 0;
    this.y = 0;
    this.packed = false;

    this.width = width;
    this.height = height;
  }

  _createClass(Box, [{
    key: "rotate",
    value: function rotate() {
      var width = this.width,
          height = this.height;

      this.width = height;
      this.height = width;
    }
  }, {
    key: "label",
    get: function get() {
      return this.width + "x" + this.height + " at [" + this.x + "," + this.y + "]";
    }
  }, {
    key: "area",
    get: function get() {
      return this.width * this.height;
    }
  }]);

  return Box;
}();

exports.default = Box;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bin = function () {
  function Bin(name, w, h, d, mw) {
    _classCallCheck(this, Bin);

    this.name = '';
    this.width = 0;
    this.height = 0;
    this.depth = 0;
    this.maxWeight = 0;
    this.items = [];

    this.name = name;
    this.width = w;
    this.height = h;
    this.depth = d;
    this.maxWeight = mw;
  }

  _createClass(Bin, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: 'getDepth',
    value: function getDepth() {
      return this.depth;
    }
  }, {
    key: 'getMaxWeight',
    value: function getMaxWeight() {
      return this.maxWeight;
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return this.items;
    }
  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.getWidth() * this.getHeight() * this.getDepth();
    }
  }, {
    key: 'getPackedWeight',
    value: function getPackedWeight() {
      return this.items.reduce(function (weight, item) {
        return weight + item.getWeight();
      }, 0);
    }
  }, {
    key: 'putItem',
    value: function putItem(item, p) {
      var box = this;
      var fit = false;

      item.position = p;
      for (var i = 0; i < 6; i++) {
        item.rotationType = i;
        var d = item.getDimension();

        if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {
          continue;
        }

        fit = true;

        for (var j = 0; j < box.items.length; j++) {
          var _j = box.items[j];
          if (_j.intersect(item)) {
            fit = false;
            break;
          }
        }

        if (fit) {
          box.items.push(item);
        }

        return fit;
      }

      return fit;
    }
  }]);

  return Bin;
}();

exports.default = Bin;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RotationTypeStrings;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RotationType_WHD = exports.RotationType_WHD = 0;
var RotationType_HWD = exports.RotationType_HWD = 1;
var RotationType_HDW = exports.RotationType_HDW = 2;
var RotationType_DHW = exports.RotationType_DHW = 3;
var RotationType_DWH = exports.RotationType_DWH = 4;
var RotationType_WDH = exports.RotationType_WDH = 5;

var WidthAxis = exports.WidthAxis = 0;
var HeightAxis = exports.HeightAxis = 1;
var DepthAxis = exports.DepthAxis = 2;

var StartPosition = exports.StartPosition = [0, 0, 0];

var RotationTypeStrings = exports.RotationTypeStrings = (_RotationTypeStrings = {}, _defineProperty(_RotationTypeStrings, RotationType_WHD, 'RotationType_WHD (w,h,d)'), _defineProperty(_RotationTypeStrings, RotationType_HWD, 'RotationType_HWD (h,w,d)'), _defineProperty(_RotationTypeStrings, RotationType_HDW, 'RotationType_HDW (h,d,w)'), _defineProperty(_RotationTypeStrings, RotationType_DHW, 'RotationType_DHW (d,h,w)'), _defineProperty(_RotationTypeStrings, RotationType_DWH, 'RotationType_DWH (d,w,h)'), _defineProperty(_RotationTypeStrings, RotationType_WDH, 'RotationType_WDH (w,d,h)'), _RotationTypeStrings);

var Item = function () {
  // x, y, z

  function Item(name, w, h, d, wg) {
    _classCallCheck(this, Item);

    this.name = '';
    this.width = 0;
    this.height = 0;
    this.depth = 0;
    this.weight = 0;
    this.rotationType = RotationType_WHD;
    this.position = [];

    this.name = name;
    this.width = w;
    this.height = h;
    this.depth = d;
    this.weight = wg;
  }

  _createClass(Item, [{
    key: 'getWidth',
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: 'getDepth',
    value: function getDepth() {
      return this.depth;
    }
  }, {
    key: 'getWeight',
    value: function getWeight() {
      return this.weight;
    }
  }, {
    key: 'getRotationType',
    value: function getRotationType() {
      return this.rotationType;
    }
  }, {
    key: 'getRotationTypeString',
    value: function getRotationTypeString() {
      return RotationTypeStrings[this.getRotationType()];
    }
  }, {
    key: 'getDimension',
    value: function getDimension() {
      var d = void 0;
      switch (this.rotationType) {
        case RotationType_WHD:
          d = [this.getWidth(), this.getHeight(), this.getDepth()];
          break;
        case RotationType_HWD:
          d = [this.getHeight(), this.getWidth(), this.getDepth()];
          break;
        case RotationType_HDW:
          d = [this.getHeight(), this.getDepth(), this.getWidth()];
          break;
        case RotationType_DHW:
          d = [this.getDepth(), this.getHeight(), this.getWidth()];
          break;
        case RotationType_DWH:
          d = [this.getDepth(), this.getWidth(), this.getHeight()];
          break;
        case RotationType_WDH:
          d = [this.getWidth(), this.getDepth(), this.getHeight()];
          break;
      }
      return d;
    }
  }, {
    key: 'intersect',
    value: function intersect(i2) {
      return rectIntersect(this, i2, WidthAxis, HeightAxis) && rectIntersect(this, i2, HeightAxis, DepthAxis) && rectIntersect(this, i2, WidthAxis, DepthAxis);
    }
  }, {
    key: 'getVolume',
    value: function getVolume() {
      return this.getWidth() * this.getHeight() * this.getDepth();
    }
  }]);

  return Item;
}();

exports.default = Item;
var rectIntersect = exports.rectIntersect = function rectIntersect(i1, i2, x, y) {
  var d1 = void 0,
      d2 = void 0,
      cx1 = void 0,
      cy1 = void 0,
      cx2 = void 0,
      cy2 = void 0,
      ix = void 0,
      iy = void 0;

  d1 = i1.getDimension();
  d2 = i2.getDimension();

  cx1 = i1.position[x] + d1[x] / 2;
  cy1 = i1.position[y] + d1[y] / 2;
  cx2 = i2.position[x] + d2[x] / 2;
  cy2 = i2.position[y] + d2[y] / 2;

  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);
  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);

  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heuristics = exports.Packer = exports.Box = exports.Bin = undefined;

var _Bin = __webpack_require__(7);

var _Bin2 = _interopRequireDefault(_Bin);

var _Box = __webpack_require__(3);

var _Box2 = _interopRequireDefault(_Box);

var _Packer = __webpack_require__(8);

var _Packer2 = _interopRequireDefault(_Packer);

var _heuristics = __webpack_require__(13);

var heuristics = _interopRequireWildcard(_heuristics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Bin = _Bin2.default;
exports.Box = _Box2.default;
exports.Packer = _Packer2.default;
exports.heuristics = heuristics;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeSpaceBox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BestShortSideFit = __webpack_require__(2);

var _BestShortSideFit2 = _interopRequireDefault(_BestShortSideFit);

var _Box = __webpack_require__(3);

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bin = function () {
  function Bin(width, height, heuristic) {
    _classCallCheck(this, Bin);

    this.width = null;
    this.height = null;
    this.boxes = [];
    this.heuristic = null;
    this.freeRectangles = [];

    this.width = width;
    this.height = height;
    this.freeRectangles = [new FreeSpaceBox(width, height)];
    this.heuristic = heuristic || new _BestShortSideFit2.default();
  }

  _createClass(Bin, [{
    key: 'insert',
    value: function insert(box) {
      if (box.packed) return false;

      this.heuristic.findPositionForNewNode(box, this.freeRectangles);
      if (!box.packed) return false;

      var numRectanglesToProcess = this.freeRectangles.length;
      var i = 0;

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
  }, {
    key: 'scoreFor',
    value: function scoreFor(box) {
      var copyBox = new _Box2.default(box.width, box.height);
      var score = this.heuristic.findPositionForNewNode(copyBox, this.freeRectangles);
      return score;
    }
  }, {
    key: 'isLargerThan',
    value: function isLargerThan(box) {
      return this.width >= box.width && this.height >= box.height || this.height >= box.width && this.width >= box.height;
    }
  }, {
    key: 'splitFreeNode',
    value: function splitFreeNode(freeNode, usedNode) {
      // Test with SAT if the rectangles even intersect.
      if (usedNode.x >= freeNode.x + freeNode.width || usedNode.x + usedNode.width <= freeNode.x || usedNode.y >= freeNode.y + freeNode.height || usedNode.y + usedNode.height <= freeNode.y) {
        return false;
      }

      this.trySplitFreeNodeVertically(freeNode, usedNode);
      this.trySplitFreeNodeHorizontally(freeNode, usedNode);

      return true;
    }
  }, {
    key: 'trySplitFreeNodeVertically',
    value: function trySplitFreeNodeVertically(freeNode, usedNode) {
      if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width > freeNode.x) {
        this.tryLeaveFreeSpaceAtTop(freeNode, usedNode);
        this.tryLeaveFreeSpaceAtBottom(freeNode, usedNode);
      }
    }
  }, {
    key: 'tryLeaveFreeSpaceAtTop',
    value: function tryLeaveFreeSpaceAtTop(freeNode, usedNode) {
      if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
        var newNode = _extends({}, freeNode);
        newNode.height = usedNode.y - newNode.y;
        this.freeRectangles.push(newNode);
      }
    }
  }, {
    key: 'tryLeaveFreeSpaceAtBottom',
    value: function tryLeaveFreeSpaceAtBottom(freeNode, usedNode) {
      if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
        var newNode = _extends({}, freeNode);
        newNode.y = usedNode.y + usedNode.height;
        newNode.height = freeNode.y + freeNode.height - (usedNode.y + usedNode.height);
        this.freeRectangles.push(newNode);
      }
    }
  }, {
    key: 'trySplitFreeNodeHorizontally',
    value: function trySplitFreeNodeHorizontally(freeNode, usedNode) {
      if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y) {
        this.tryLeaveFreeSpaceOnLeft(freeNode, usedNode);
        this.tryLeaveFreeSpaceOnRight(freeNode, usedNode);
      }
    }
  }, {
    key: 'tryLeaveFreeSpaceOnLeft',
    value: function tryLeaveFreeSpaceOnLeft(freeNode, usedNode) {
      if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
        var newNode = _extends({}, freeNode);
        newNode.width = usedNode.x - newNode.x;
        this.freeRectangles.push(newNode);
      }
    }
  }, {
    key: 'tryLeaveFreeSpaceOnRight',
    value: function tryLeaveFreeSpaceOnRight(freeNode, usedNode) {
      if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
        var newNode = _extends({}, freeNode);
        newNode.x = usedNode.x + usedNode.width;
        newNode.width = freeNode.x + freeNode.width - (usedNode.x + usedNode.width);
        this.freeRectangles.push(newNode);
      }
    }

    /**
     * Goes through the free rectangle list and removes any redundant entries.
     */

  }, {
    key: 'pruneFreeList',
    value: function pruneFreeList() {
      var i = 0;
      while (i < this.freeRectangles.length) {
        var j = i + 1;
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
  }, {
    key: 'isContainedIn',
    value: function isContainedIn(rectA, rectB) {
      return rectA && rectB && rectA.x >= rectB.x && rectA.y >= rectB.y && rectA.x + rectA.width <= rectB.x + rectB.width && rectA.y + rectA.height <= rectB.y + rectB.height;
    }
  }, {
    key: 'area',
    get: function get() {
      return this.width * this.height;
    }
  }, {
    key: 'efficiency',
    get: function get() {
      var boxesArea = 0;
      this.boxes.forEach(function (box) {
        boxesArea += box.area;
      });
      return boxesArea * 100 / this.area;
    }
  }, {
    key: 'label',
    get: function get() {
      return this.width + 'x' + this.height + ' ' + this.efficiency + '%';
    }
  }]);

  return Bin;
}();

exports.default = Bin;

var FreeSpaceBox = exports.FreeSpaceBox = function FreeSpaceBox(width, height) {
  _classCallCheck(this, FreeSpaceBox);

  this.x = 0;
  this.y = 0;
  this.width = null;
  this.height = null;

  this.width = width;
  this.height = height;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

var _ScoreBoard = __webpack_require__(9);

var _ScoreBoard2 = _interopRequireDefault(_ScoreBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Packer = function () {
  function Packer(bins) {
    _classCallCheck(this, Packer);

    this.bins = [];
    this.unpackedBoxes = [];

    this.bins = bins;
  }

  _createClass(Packer, [{
    key: 'pack',
    value: function pack(boxes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var packedBoxes = [];
      var entry = void 0;

      boxes = boxes.filter(function (box) {
        return !box.packed;
      });
      if (boxes.length === 0) return packedBoxes;

      var limit = options.limit || _Score2.default.MAX_INT;
      var board = new _ScoreBoard2.default(this.bins, boxes);
      var r = 0;
      while (entry = board.bestFit()) {
        entry.bin.insert(entry.box);
        board.removeBox(entry.box);
        board.recalculateBin(entry.bin);
        packedBoxes.push(entry.box);
        if (packedBoxes.length >= limit) {
          break;
        }
      };

      this.unpackedBoxes = boxes.filter(function (box) {
        return !box.packed;
      });

      return packedBoxes;
    }
  }]);

  return Packer;
}();

exports.default = Packer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // #       box_1 box_2 box_3 ...
// # bin_1  100   200    0
// # bin_2   0     5     0
// # bin_3   9    100    0
// # ...


var _ScoreBoardEntry = __webpack_require__(10);

var _ScoreBoardEntry2 = _interopRequireDefault(_ScoreBoardEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreBoard = function () {
  function ScoreBoard(bins, boxes) {
    var _this = this;

    _classCallCheck(this, ScoreBoard);

    this.entries = [];

    bins.forEach(function (bin) {
      _this.addBinEntries(bin, boxes);
    });
  }

  _createClass(ScoreBoard, [{
    key: 'debug',
    value: function debug() {
      __webpack_require__(11);
      console.table(this.entries.map(function (entry) {
        return { bin: entry.bin.label, box: entry.box.label, score: entry.score };
      }));
    }
  }, {
    key: 'addBinEntries',
    value: function addBinEntries(bin, boxes) {
      var _this2 = this;

      boxes.forEach(function (box) {
        var entry = new _ScoreBoardEntry2.default(bin, box);
        entry.calculate();
        _this2.entries.push(entry);
      });
    }
  }, {
    key: 'any',
    value: function any() {
      return this.boxes.some(function (box) {
        return box;
      });
    }
  }, {
    key: 'largestNotFitingBox',
    value: function largestNotFitingBox() {
      var _this3 = this;

      var unfit = null;
      var fittingBoxes = this.entries.filter(function (entry) {
        return entry.fit;
      }).map(function (entry) {
        return entry.box;
      });

      this.entries.forEach(function (entry) {
        if (!_this3.fittingBoxes.contains(entry.box)) {
          return;
        }
        if (unfit === null || unfit.box.area < entry.box.area) {
          _this3.unfit = entry;
        }
      });

      return unfit.box ? unfit : false;
    }
  }, {
    key: 'bestFit',
    value: function bestFit() {
      var best = null;
      for (var i = 0; i < this.entries.length; i++) {
        var entry = this.entries[i];
        if (!entry.fit()) {
          continue;
        }
        if (best === null || entry.score < best.score) {
          best = entry;
        }
      }
      return best;
    }
  }, {
    key: 'removeBox',
    value: function removeBox(box) {
      this.entries = this.entries.filter(function (entry) {
        return entry.box !== box;
      });
    }
  }, {
    key: 'addBin',
    value: function addBin(bin) {
      this.addBinEntries(bin, this.currentBoxes());
    }
  }, {
    key: 'recalculateBin',
    value: function recalculateBin(bin) {
      this.entries.filter(function (entry) {
        return entry.bin === bin;
      }).forEach(function (entry) {
        return entry.calculate();
      });
    }
  }, {
    key: 'currentBoxes',
    value: function currentBoxes() {
      return [].concat(_toConsumableArray(new Set(this.entries.map(function (entry) {
        return entry.box;
      }))));
    }
  }]);

  return ScoreBoard;
}();

exports.default = ScoreBoard;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreBoardEntry = function () {
  function ScoreBoardEntry(bin, box) {
    _classCallCheck(this, ScoreBoardEntry);

    this.bin = null;
    this.box = null;
    this.score = null;

    this.bin = bin;
    this.box = box;
  }

  _createClass(ScoreBoardEntry, [{
    key: "calculate",
    value: function calculate() {
      this.score = this.bin.scoreFor(this.box);
      return this.score;
    }
  }, {
    key: "fit",
    value: function fit() {
      return !this.score.isBlank();
    }
  }]);

  return ScoreBoardEntry;
}();

exports.default = ScoreBoardEntry;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  'use strict';

  function setupConsoleTable() {
    if (typeof console === 'undefined') {
      throw new Error('Weird, console object is undefined');
    }
    if (typeof console.table === 'function') {
      return;
    }

    function isType(t, x) {
      return typeof x === t;
    }

    var isString = isType.bind(null, 'string');

    function isArrayOf(isTypeFn, a) {
      return Array.isArray(a) &&
        a.every(isTypeFn);
    }

    var isArrayOfStrings = isArrayOf.bind(null, isString);
    var isArrayOfArrays = isArrayOf.bind(null, Array.isArray);

    var Table = __webpack_require__(12);

    function arrayToString(arr) {
      var t = new Table();
      arr.forEach(function (record) {
        if (typeof record === 'string' ||
          typeof record === 'number') {
          t.cell('item', record);
        } else {
          // assume plain object
          Object.keys(record).forEach(function (property) {
            t.cell(property, record[property]);
          });
        }
        t.newRow();
      });
      return t.toString();
    }

    function printTableWithColumnTitles(titles, items) {
      var t = new Table();
      items.forEach(function (item) {
        item.forEach(function (value, k) {
          t.cell(titles[k], value);
        });
        t.newRow();
      });
      var str = t.toString();
      console.log(str);
    }

    function printTitleTable(title, arr) {
      var str = arrayToString(arr);
      var rowLength = str.indexOf('\n');
      if (rowLength > 0) {
        if (title.length > rowLength) {
          rowLength = title.length;
        }
        console.log(title);
        var sep = '-', k, line = '';
        for (k = 0; k < rowLength; k += 1) {
          line += sep;
        }
        console.log(line);
      }
      console.log(str);
    }

    function objectToArray(obj) {
      var keys = Object.keys(obj);
      return keys.map(function (key) {
        return {
          key: key,
          value: obj[key]
        };
      });
    }

    function objectToString(obj) {
      return arrayToString(objectToArray(obj));
    }

    console.table = function () {
      var args = Array.prototype.slice.call(arguments);

      if (args.length === 2 &&
        typeof args[0] === 'string' &&
        Array.isArray(args[1])) {

        return printTitleTable(args[0], args[1]);
      }

      if (args.length === 2 &&
        isArrayOfStrings(args[0]) &&
        isArrayOfArrays(args[1])) {
        return printTableWithColumnTitles(args[0], args[1]);
      }

      args.forEach(function (k) {
        if (typeof k === 'string') {
          return console.log(k);
        } else if (Array.isArray(k)) {
          console.log(arrayToString(k));
        } else if (typeof k === 'object') {
          console.log(objectToString(k));
        }
      });
    };
  }

  setupConsoleTable();
}());


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = Table

function Table() {
  this.rows = []
  this.row = {__printers : {}}
}

/**
 * Push the current row to the table and start a new one
 *
 * @returns {Table} `this`
 */

Table.prototype.newRow = function() {
  this.rows.push(this.row)
  this.row = {__printers : {}}
  return this
}

/**
 * Write cell in the current row
 *
 * @param {String} col          - Column name
 * @param {Any} val             - Cell value
 * @param {Function} [printer]  - Printer function to format the value
 * @returns {Table} `this`
 */

Table.prototype.cell = function(col, val, printer) {
  this.row[col] = val
  this.row.__printers[col] = printer || string
  return this
}

/**
 * String to separate columns
 */

Table.prototype.separator = '  '

function string(val) {
  return val === undefined ? '' : ''+val
}

function length(str) {
  return str.replace(/\u001b\[\d+m/g, '').length
}

/**
 * Default printer
 */

Table.string = string

/**
 * Create a printer which right aligns the content by padding with `ch` on the left
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.leftPadder = leftPadder

function leftPadder(ch) {
  return function(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return pad + str
  }
}

/**
 * Printer which right aligns the content
 */

var padLeft = Table.padLeft = leftPadder(' ')

/**
 * Create a printer which pads with `ch` on the right
 *
 * @param {String} ch
 * @returns {Function}
 */

Table.rightPadder = rightPadder

function rightPadder(ch) {
  return function padRight(val, width) {
    var str = string(val)
    var len = length(str)
    var pad = width > len ? Array(width - len + 1).join(ch) : ''
    return str + pad
  }
}

var padRight = rightPadder(' ')

/**
 * Create a printer for numbers
 *
 * Will do right alignment and optionally fix the number of digits after decimal point
 *
 * @param {Number} [digits] - Number of digits for fixpoint notation
 * @returns {Function}
 */

Table.number = function(digits) {
  return function(val, width) {
    if (val == null) return ''
    if (typeof val != 'number')
      throw new Error(''+val + ' is not a number')
    var str = digits == null ? val+'' : val.toFixed(digits)
    return padLeft(str, width)
  }
}

function each(row, fn) {
  for(var key in row) {
    if (key == '__printers') continue
    fn(key, row[key])
  }
}

/**
 * Get list of columns in printing order
 *
 * @returns {string[]}
 */

Table.prototype.columns = function() {
  var cols = {}
  for(var i = 0; i < 2; i++) { // do 2 times
    this.rows.forEach(function(row) {
      var idx = 0
      each(row, function(key) {
        idx = Math.max(idx, cols[key] || 0)
        cols[key] = idx
        idx++
      })
    })
  }
  return Object.keys(cols).sort(function(a, b) {
    return cols[a] - cols[b]
  })
}

/**
 * Format just rows, i.e. print the table without headers and totals
 *
 * @returns {String} String representaion of the table
 */

Table.prototype.print = function() {
  var cols = this.columns()
  var separator = this.separator
  var widths = {}
  var out = ''

  // Calc widths
  this.rows.forEach(function(row) {
    each(row, function(key, val) {
      var str = row.__printers[key].call(row, val)
      widths[key] = Math.max(length(str), widths[key] || 0)
    })
  })

  // Now print
  this.rows.forEach(function(row) {
    var line = ''
    cols.forEach(function(key) {
      var width = widths[key]
      var str = row.hasOwnProperty(key)
        ? ''+row.__printers[key].call(row, row[key], width)
        : ''
      line += padRight(str, width) + separator
    })
    line = line.slice(0, -separator.length)
    out += line + '\n'
  })

  return out
}

/**
 * Format the table
 *
 * @returns {String}
 */

Table.prototype.toString = function() {
  var cols = this.columns()
  var out = new Table()

  // copy options
  out.separator = this.separator

  // Write header
  cols.forEach(function(col) {
    out.cell(col, col)
  })
  out.newRow()
  out.pushDelimeter(cols)

  // Write body
  out.rows = out.rows.concat(this.rows)

  // Totals
  if (this.totals && this.rows.length) {
    out.pushDelimeter(cols)
    this.forEachTotal(out.cell.bind(out))
    out.newRow()
  }

  return out.print()
}

/**
 * Push delimeter row to the table (with each cell filled with dashs during printing)
 *
 * @param {String[]} [cols]
 * @returns {Table} `this`
 */

Table.prototype.pushDelimeter = function(cols) {
  cols = cols || this.columns()
  cols.forEach(function(col) {
    this.cell(col, undefined, leftPadder('-'))
  }, this)
  return this.newRow()
}

/**
 * Compute all totals and yield the results to `cb`
 *
 * @param {Function} cb - Callback function with signature `(column, value, printer)`
 */

Table.prototype.forEachTotal = function(cb) {
  for(var key in this.totals) {
    var aggr = this.totals[key]
    var acc = aggr.init
    var len = this.rows.length
    this.rows.forEach(function(row, idx) {
      acc = aggr.reduce.call(row, acc, row[key], idx, len)
    })
    cb(key, acc, aggr.printer)
  }
}

/**
 * Format the table so that each row represents column and each column represents row
 *
 * @param {Object} [opts]
 * @param {String} [ops.separator] - Column separation string
 * @param {Function} [opts.namePrinter] - Printer to format column names
 * @returns {String}
 */

Table.prototype.printTransposed = function(opts) {
  opts = opts || {}
  var out = new Table
  out.separator = opts.separator || this.separator
  this.columns().forEach(function(col) {
    out.cell(0, col, opts.namePrinter)
    this.rows.forEach(function(row, idx) {
      out.cell(idx+1, row[col], row.__printers[col])
    })
    out.newRow()
  }, this)
  return out.print()
}

/**
 * Sort the table
 *
 * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on
 * @returns {Table} `this`
 */

Table.prototype.sort = function(cmp) {
  if (typeof cmp == 'function') {
    this.rows.sort(cmp)
    return this
  }

  var keys = Array.isArray(cmp) ? cmp : this.columns()

  var comparators = keys.map(function(key) {
    var order = 'asc'
    var m = /(.*)\|\s*(asc|des)\s*$/.exec(key)
    if (m) {
      key = m[1]
      order = m[2]
    }
    return function (a, b) {
      return order == 'asc'
        ? compare(a[key], b[key])
        : compare(b[key], a[key])
    }
  })

  return this.sort(function(a, b) {
    for (var i = 0; i < comparators.length; i++) {
      var order = comparators[i](a, b)
      if (order != 0) return order
    }
    return 0
  })
}

function compare(a, b) {
  if (a === b) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  if (a === null) return 1
  if (b === null) return -1
  if (a > b) return 1
  if (a < b) return -1
  return compare(String(a), String(b))
}

/**
 * Add a total for the column
 *
 * @param {String} col - column name
 * @param {Object} [opts]
 * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value
 * @param {Function} [opts.printer = padLeft] - Printer to format the total cell
 * @param {Any} [opts.init = 0] - Initial value for reduction
 * @returns {Table} `this`
 */

Table.prototype.total = function(col, opts) {
  opts = opts || {}
  this.totals = this.totals || {}
  this.totals[col] = {
    reduce: opts.reduce || Table.aggr.sum,
    printer: opts.printer || padLeft,
    init: opts.init == null ? 0 : opts.init
  }
  return this
}

/**
 * Predefined helpers for totals
 */

Table.aggr = {}

/**
 * Create a printer which formats the value with `printer`,
 * adds the `prefix` to it and right aligns the whole thing
 *
 * @param {String} prefix
 * @param {Function} printer
 * @returns {printer}
 */

Table.aggr.printer = function(prefix, printer) {
  printer = printer || string
  return function(val, width) {
    return padLeft(prefix + printer(val), width)
  }
}

/**
 * Sum reduction
 */

Table.aggr.sum = function(acc, val) {
  return acc + val
}

/**
 * Average reduction
 */

Table.aggr.avg = function(acc, val, idx, len) {
  acc = acc + val
  return idx + 1 == len ? acc/len : acc
}

/**
 * Print the array or object
 *
 * @param {Array|Object} obj - Object to print
 * @param {Function|Object} [format] - Format options
 * @param {Function} [cb] - Table post processing and formating
 * @returns {String}
 */

Table.print = function(obj, format, cb) {
  var opts = format || {}

  format = typeof format == 'function'
    ? format
    : function(obj, cell) {
      for(var key in obj) {
        if (!obj.hasOwnProperty(key)) continue
        var params = opts[key] || {}
        cell(params.name || key, obj[key], params.printer)
      }
    }

  var t = new Table
  var cell = t.cell.bind(t)

  if (Array.isArray(obj)) {
    cb = cb || function(t) { return t.toString() }
    obj.forEach(function(item) {
      format(item, cell)
      t.newRow()
    })
  } else {
    cb = cb || function(t) { return t.printTransposed({separator: ' : '}) }
    format(obj, cell)
    t.newRow()
  }

  return cb(t)
}

/**
 * Same as `Table.print()` but yields the result to `console.log()`
 */

Table.log = function(obj, format, cb) {
  console.log(Table.print(obj, format, cb))
}

/**
 * Same as `.toString()` but yields the result to `console.log()`
 */

Table.prototype.log = function() {
  console.log(this.toString())
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BestAreaFit = __webpack_require__(14);

Object.defineProperty(exports, 'BestAreaFit', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BestAreaFit).default;
  }
});

var _BestLongSideFit = __webpack_require__(15);

Object.defineProperty(exports, 'BestLongSideFit', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BestLongSideFit).default;
  }
});

var _BestShortSideFit = __webpack_require__(2);

Object.defineProperty(exports, 'BestShortSideFit', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BestShortSideFit).default;
  }
});

var _BottomLeft = __webpack_require__(16);

Object.defineProperty(exports, 'BottomLeft', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BottomLeft).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = __webpack_require__(1);

var _Base3 = _interopRequireDefault(_Base2);

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BestAreaFit = function (_Base) {
  _inherits(BestAreaFit, _Base);

  function BestAreaFit() {
    _classCallCheck(this, BestAreaFit);

    return _possibleConstructorReturn(this, (BestAreaFit.__proto__ || Object.getPrototypeOf(BestAreaFit)).apply(this, arguments));
  }

  _createClass(BestAreaFit, [{
    key: 'calculateScore',
    value: function calculateScore(freeRect, rectWidth, rectHeight) {
      var areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;
      var leftOverHoriz = Math.abs(freeRect.width - rectWidth);
      var leftOverVert = Math.abs(freeRect.height - rectHeight);
      var shortSideFit = Math.min(leftOverHoriz, leftOverVert);
      return new _Score2.default(areaFit, shortSideFit);
    }
  }]);

  return BestAreaFit;
}(_Base3.default);

exports.default = BestAreaFit;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = __webpack_require__(1);

var _Base3 = _interopRequireDefault(_Base2);

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BestLongSideFit = function (_Base) {
  _inherits(BestLongSideFit, _Base);

  function BestLongSideFit() {
    _classCallCheck(this, BestLongSideFit);

    return _possibleConstructorReturn(this, (BestLongSideFit.__proto__ || Object.getPrototypeOf(BestLongSideFit)).apply(this, arguments));
  }

  _createClass(BestLongSideFit, [{
    key: 'calculateScore',
    value: function calculateScore(freeRect, rectWidth, rectHeight) {
      var leftOverHoriz = Math.abs(freeRect.width - rectWidth);
      var leftOverVert = Math.abs(freeRect.height - rectHeight);
      var args = [leftOverHoriz, leftOverVert].sort(function (a, b) {
        return a - b;
      }).reverse();
      return new _Score2.default(args[0], args[1]);
    }
  }]);

  return BestLongSideFit;
}(_Base3.default);

exports.default = BestLongSideFit;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = __webpack_require__(1);

var _Base3 = _interopRequireDefault(_Base2);

var _Score = __webpack_require__(0);

var _Score2 = _interopRequireDefault(_Score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BottomLeft = function (_Base) {
  _inherits(BottomLeft, _Base);

  function BottomLeft() {
    _classCallCheck(this, BottomLeft);

    return _possibleConstructorReturn(this, (BottomLeft.__proto__ || Object.getPrototypeOf(BottomLeft)).apply(this, arguments));
  }

  _createClass(BottomLeft, [{
    key: 'calculateScore',
    value: function calculateScore(freeRect, rectWidth, rectHeight) {
      var topSideY = freeRect.y + rectHeight;
      return new _Score2.default(topSideY, freeRect.x);
    }
  }]);

  return BottomLeft;
}(_Base3.default);

exports.default = BottomLeft;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Packer = exports.Item = exports.Bin = undefined;

var _Bin = __webpack_require__(4);

var _Bin2 = _interopRequireDefault(_Bin);

var _Item = __webpack_require__(5);

var _Item2 = _interopRequireDefault(_Item);

var _Packer = __webpack_require__(18);

var _Packer2 = _interopRequireDefault(_Packer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Bin = _Bin2.default;
exports.Item = _Item2.default;
exports.Packer = _Packer2.default;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bin = __webpack_require__(4);

var _Bin2 = _interopRequireDefault(_Bin);

var _Item = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Packer = function () {
  function Packer() {
    _classCallCheck(this, Packer);

    this.bins = [];
    this.items = [];
    this.unfitItems = [];
  }

  _createClass(Packer, [{
    key: 'addBin',
    value: function addBin(bin) {
      this.bins.push(bin);
    }
  }, {
    key: 'addItem',
    value: function addItem(item) {
      this.items.push(item);
    }
  }, {
    key: 'findFittedBin',
    value: function findFittedBin(i) {
      for (var _i = 0; _i < this.bins.length; _i++) {
        var b = this.bins[_i];

        if (!b.putItem(i, _Item.StartPosition)) {
          continue;
        }

        if (b.items.length === 1 && b.items[0] === i) {
          b.items = [];
        }

        return b;
      }
      return null;
    }
  }, {
    key: 'getBiggerBinThan',
    value: function getBiggerBinThan(b) {
      var v = b.getVolume();
      for (var _i = 0; _i < this.bins; _i++) {
        var b2 = this.bins[_i];
        if (b2.getVolume() > v) {
          return b2;
        }
      }
      return null;
    }
  }, {
    key: 'unfitItem',
    value: function unfitItem() {
      if (this.items.length === 0) {
        return;
      }
      this.unfitItems.push(this.items[0]);
      this.items.splice(0, 1);
    }
  }, {
    key: 'packToBin',
    value: function packToBin(b, items) {
      var b2 = null;
      var unpacked = [];
      var fit = b.putItem(items[0], _Item.StartPosition);

      if (!fit) {
        var _b = this.getBiggerBinThan(b);
        if (_b) {
          return this.packToBin(_b, items);
        }
        return this.items;
      }

      // Pack unpacked items.
      for (var _i = 1; _i < this.items.length; _i++) {
        var fitted = false;
        var item = this.items[_i];

        var maxWeight = b.getMaxWeight();
        if (!maxWeight || item.getWeight() + b.getPackedWeight() <= maxWeight) {
          // Try available pivots in current bin that are not intersect with
          // existing items in current bin.
          lookup: for (var _pt = 0; _pt < 3; _pt++) {
            for (var _j = 0; _j < b.items.length; _j++) {
              var pv = void 0;
              var ib = b.items[_j];
              switch (_pt) {
                case _Item.WidthAxis:
                  pv = [ib.position[0] + ib.getWidth(), ib.position[1], ib.position[2]];
                  break;
                case _Item.HeightAxis:
                  pv = [ib.position[0], ib.position[1] + ib.getHeight(), ib.position[2]];
                  break;
                case _Item.DepthAxis:
                  pv = [ib.position[0], ib.position[1], ib.position[2] + ib.getDepth()];
                  break;
              }

              if (b.putItem(item, pv)) {
                fitted = true;
                break lookup;
              }
            }
          }
        }

        if (!fitted) {
          while (b2 !== null) {
            b2 = this.getBiggerBinThan(b);
            if (b2) {
              b2.items.push(item);
              var left = this.packToBin(b2, b2.items);
              if (left.length === 0) {
                b = b2;
                fitted = true;
                break;
              }
            }
          }

          if (!fitted) {
            unpacked.push(item);
          }
        }
      }

      return unpacked;
    }
  }, {
    key: 'pack',
    value: function pack() {
      this.bins.sort(function (a, b) {
        return a.getVolume() > b.getVolume();
      });

      this.items.sort(function (a, b) {
        return a.getVolume() > b.getVolume();
      });

      while (this.items.length > 0) {
        var bin = this.findFittedBin(this.items[0]);

        if (bin === null) {
          this.unfitItem();
          continue;
        }

        this.items = this.packToBin(bin, this.items);
      }

      return null;
    }
  }]);

  return Packer;
}();

exports.default = Packer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BP3D = exports.BP2D = undefined;

var _D = __webpack_require__(6);

var BP2D = _interopRequireWildcard(_D);

var _D2 = __webpack_require__(17);

var BP3D = _interopRequireWildcard(_D2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.BP2D = BP2D;
exports.BP3D = BP3D;

/***/ })
/******/ ]);
});
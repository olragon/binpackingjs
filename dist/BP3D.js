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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./3D/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@babel/runtime/helpers/classCallCheck/index.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/classCallCheck/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/classCallCheck/index.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/createClass/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/createClass/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/createClass/index.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/defineProperty/index.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/defineProperty/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\nmodule.exports[\"default\"] = module.exports, module.exports.__esModule = true;\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/defineProperty/index.js?");

/***/ }),

/***/ "./3D/Bin.js":
/*!*******************!*\
  !*** ./3D/Bin.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bin; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck/index.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass/index.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/defineProperty/index.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/log */ \"./lib/log.js\");\n\nvar log = Object(_lib_log__WEBPACK_IMPORTED_MODULE_3__[\"createLogger\"])('3D:');var\n\nBin = /*#__PURE__*/function () {\n\n\n\n\n\n\n\n\n\n  function Bin(name, w, h, d, mw) {_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Bin);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"name\", '');_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"width\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"height\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"depth\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"maxWeight\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"items\", []);\n    this.name = name;\n    this.width = w;\n    this.height = h;\n    this.depth = d;\n    this.maxWeight = mw;\n  }_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Bin, [{ key: \"getName\", value:\n\n    function getName() {\n      return this.name;\n    } }, { key: \"getWidth\", value:\n\n    function getWidth() {\n      return this.width;\n    } }, { key: \"getHeight\", value:\n\n    function getHeight() {\n      return this.height;\n    } }, { key: \"getDepth\", value:\n\n    function getDepth() {\n      return this.depth;\n    } }, { key: \"getMaxWeight\", value:\n\n    function getMaxWeight() {\n      return this.maxWeight;\n    } }, { key: \"getItems\", value:\n\n    function getItems() {\n      return this.items;\n    } }, { key: \"getVolume\", value:\n\n    function getVolume() {\n      return this.getWidth() * this.getHeight() * this.getDepth();\n    } }, { key: \"getPackedWeight\", value:\n\n    function getPackedWeight() {\n      return this.items.reduce(function (weight, item) {return weight + item.getWeight();}, 0);\n    } }, { key: \"weighItem\", value:\n\n    function weighItem(item) {\n      var maxWeight = this.getMaxWeight();\n      return !maxWeight || item.getWeight() + this.getPackedWeight() <= maxWeight;\n    }\n\n    /**\n     * Calculate a score for a given item and rotation type.\n     *\n     * Scores are higher for rotations that closest match item dimensions to Bin dimensions.\n     * For example, rotating the item so the longest side is aligned with the longest Bin side.\n     *\n     * Example (Bin is 11 x 8.5 x 5.5, Item is 8.1 x 5.2 x 5.2):\n     *  Rotation 0:\n     *    8.1 / 11  = 0.736\n     *    5.2 / 8.5 = 0.612\n     *    5.2 / 5.5 = 0.945\n     *    -----------------\n     *    0.736 ** 2 + 0.612 ** 2 + 0.945 ** 2 = 1.809\n     *\n     *  Rotation 1:\n     *    8.1 / 8.5 = 0.953\n     *    5.2 / 11 = 0.473\n     *    5.2 / 5.5 = 0.945\n     *    -----------------\n     *    0.953 ** 2 + 0.473 ** 2 + 0.945 ** 2 = 2.025\n     *\n     * @param {Item} item\n     * @param {int} rotationType\n     * @return {float} score\n     */ }, { key: \"scoreRotation\", value:\n    function scoreRotation(item, rotationType) {\n      item.rotationType = rotationType;\n      var d = item.getDimension();\n\n      // If the item doesn't fit in the Bin\n      if (this.getWidth() < d[0] || this.getHeight() < d[1] || this.getDepth() < d[2]) {\n        return 0;\n      }\n\n      // Square the results to increase the impact of high values (e.g. > 0.8)\n      var widthScore = Math.pow(d[0] / this.getWidth(), 2);\n      var heightScore = Math.pow(d[1] / this.getHeight(), 2);\n      var depthScore = Math.pow(d[2] / this.getDepth(), 2);\n\n      return widthScore + heightScore + depthScore;\n    }\n\n    /**\n     * Calculate the best rotation order for a given Item based on scoreRotation().\n     *\n     * @param {Item} item\n     * @return {Array} Rotation types sorted by their score, DESC\n     */ }, { key: \"getBestRotationOrder\", value:\n    function getBestRotationOrder(item) {\n      var rotationScores = {};\n\n      // Score all rotation types\n      for (var i = 0; i < item.allowedRotation.length; i++) {\n        var r = item.allowedRotation[i];\n        rotationScores[r] = this.scoreRotation(item, r);\n      }\n\n      // Sort the rotation types (index of scores object) DESC\n      // and ensure Int values (Object.keys returns strings)\n      var sortedRotations = Object.keys(rotationScores).sort(function (a, b) {\n        return rotationScores[b] - rotationScores[a];\n      }).map(Number);\n\n      return sortedRotations;\n    } }, { key: \"putItem\", value:\n\n    function putItem(item, p) {\n      var box = this;\n      var fit = false;\n      var rotations = this.getBestRotationOrder(item);\n      item.position = p;\n\n      for (var i = 0; i < rotations.length; i++) {\n        item.rotationType = rotations[i];\n        var d = item.getDimension();\n\n        if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {\n          fit = false;\n        } else {\n          fit = true;\n\n          for (var j = 0; j < box.items.length; j++) {\n            var _j = box.items[j];\n            if (_j.intersect(item)) {\n              fit = false;\n              break;\n            }\n          }\n\n          if (fit) {\n            box.items.push(item);\n          }\n        }\n\n        log('try to putItem', fit, 'item', item.toString(), 'box', box.toString());\n\n        if (fit) {\n          break;\n        }\n      }\n      return fit;\n    } }, { key: \"toString\", value:\n\n    function toString() {\n      return \"Bin:\".concat(this.name, \" (WxHxD = \").concat(this.getWidth(), \"x\").concat(this.getHeight(), \"x\").concat(this.getDepth(), \", MaxWg. = \").concat(this.getMaxWeight(), \")\");\n    } }]);return Bin;}();\n\n//# sourceURL=webpack://BinPacking/./3D/Bin.js?");

/***/ }),

/***/ "./3D/Item.js":
/*!********************!*\
  !*** ./3D/Item.js ***!
  \********************/
/*! exports provided: RotationType_WHD, RotationType_HWD, RotationType_HDW, RotationType_DHW, RotationType_DWH, RotationType_WDH, WidthAxis, HeightAxis, DepthAxis, StartPosition, RotationTypeStrings, default, rectIntersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_WHD\", function() { return RotationType_WHD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_HWD\", function() { return RotationType_HWD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_HDW\", function() { return RotationType_HDW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_DHW\", function() { return RotationType_DHW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_DWH\", function() { return RotationType_DWH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_WDH\", function() { return RotationType_WDH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WidthAxis\", function() { return WidthAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HeightAxis\", function() { return HeightAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DepthAxis\", function() { return DepthAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StartPosition\", function() { return StartPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationTypeStrings\", function() { return RotationTypeStrings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Item; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rectIntersect\", function() { return rectIntersect; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck/index.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass/index.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/defineProperty/index.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\nvar _RotationTypeStrings;var RotationType_WHD = 0;\nvar RotationType_HWD = 1;\nvar RotationType_HDW = 2;\nvar RotationType_DHW = 3;\nvar RotationType_DWH = 4;\nvar RotationType_WDH = 5;\n\nvar WidthAxis = 0;\nvar HeightAxis = 1;\nvar DepthAxis = 2;\n\nvar StartPosition = [0, 0, 0];\n\nvar RotationTypeStrings = (_RotationTypeStrings = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_WHD, 'RotationType_WHD (w,h,d)'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_HWD, 'RotationType_HWD (h,w,d)'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_HDW, 'RotationType_HDW (h,d,w)'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_DHW, 'RotationType_DHW (d,h,w)'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_DWH, 'RotationType_DWH (d,w,h)'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_RotationTypeStrings,\nRotationType_WDH, 'RotationType_WDH (w,d,h)'), _RotationTypeStrings);var\n\n\nItem = /*#__PURE__*/function () {\n\n\n\n\n\n\n\n\n\n  // x, y, z\n\n  function Item(name, w, h, d, wg, allowedRotation) {_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Item);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"name\", '');_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"width\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"height\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"depth\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"weight\", 0);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"allowedRotation\", [0, 1, 2, 3, 4, 5]);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"rotationType\", RotationType_WHD);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"position\", []);\n    this.name = name;\n    this.width = w;\n    this.height = h;\n    this.depth = d;\n    this.weight = wg;\n    this.allowedRotation = allowedRotation ? allowedRotation : this.allowedRotation;\n  }_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Item, [{ key: \"getWidth\", value:\n\n    function getWidth() {\n      return this.width;\n    } }, { key: \"getHeight\", value:\n\n    function getHeight() {\n      return this.height;\n    } }, { key: \"getDepth\", value:\n\n    function getDepth() {\n      return this.depth;\n    } }, { key: \"getWeight\", value:\n\n    function getWeight() {\n      return this.weight;\n    } }, { key: \"getRotationType\", value:\n\n    function getRotationType() {\n      return this.rotationType;\n    } }, { key: \"getAllowedRotation\", value:\n\n    function getAllowedRotation() {\n      return this.allowedRotation;\n    } }, { key: \"getRotationTypeString\", value:\n\n    function getRotationTypeString() {\n      return RotationTypeStrings[this.getRotationType()];\n    } }, { key: \"getDimension\", value:\n\n    function getDimension() {\n      var d;\n      switch (this.rotationType) {\n        case RotationType_WHD:\n          d = [this.getWidth(), this.getHeight(), this.getDepth()];\n          break;\n        case RotationType_HWD:\n          d = [this.getHeight(), this.getWidth(), this.getDepth()];\n          break;\n        case RotationType_HDW:\n          d = [this.getHeight(), this.getDepth(), this.getWidth()];\n          break;\n        case RotationType_DHW:\n          d = [this.getDepth(), this.getHeight(), this.getWidth()];\n          break;\n        case RotationType_DWH:\n          d = [this.getDepth(), this.getWidth(), this.getHeight()];\n          break;\n        case RotationType_WDH:\n          d = [this.getWidth(), this.getDepth(), this.getHeight()];\n          break;}\n\n      return d;\n    } }, { key: \"intersect\", value:\n\n    function intersect(i2) {\n      return rectIntersect(this, i2, WidthAxis, HeightAxis) &&\n      rectIntersect(this, i2, HeightAxis, DepthAxis) &&\n      rectIntersect(this, i2, WidthAxis, DepthAxis);\n    } }, { key: \"getVolume\", value:\n\n    function getVolume() {\n      return this.getWidth() * this.getHeight() * this.getDepth();\n    } }, { key: \"toString\", value:\n\n    function toString() {\n      return \"Item:\".concat(this.name, \" (\").concat(this.getRotationTypeString(), \" = \").concat(this.getDimension().join('x'), \", Wg. = \").concat(this.weight, \")\");\n    } }]);return Item;}();\n\n\nvar rectIntersect = function rectIntersect(i1, i2, x, y) {\n  var d1, d2, cx1, cy1, cx2, cy2, ix, iy;\n\n  d1 = i1.getDimension();\n  d2 = i2.getDimension();\n\n  cx1 = i1.position[x] + d1[x] / 2;\n  cy1 = i1.position[y] + d1[y] / 2;\n  cx2 = i2.position[x] + d2[x] / 2;\n  cy2 = i2.position[y] + d2[y] / 2;\n\n  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);\n  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);\n\n  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;\n};\n\n//# sourceURL=webpack://BinPacking/./3D/Item.js?");

/***/ }),

/***/ "./3D/Packer.js":
/*!**********************!*\
  !*** ./3D/Packer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Packer; });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"../node_modules/@babel/runtime/helpers/classCallCheck/index.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"../node_modules/@babel/runtime/helpers/createClass/index.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/defineProperty/index.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\n\nvar\n\nPacker = /*#__PURE__*/function () {function Packer() {_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Packer);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"bins\",\n\n    []);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"items\",\n    []);_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"unfitItems\",\n    []);}_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Packer, [{ key: \"addBin\", value:\n\n    function addBin(bin) {\n      this.bins.push(bin);\n    } }, { key: \"addItem\", value:\n\n    function addItem(item) {\n      this.items.push(item);\n    } }, { key: \"findFittedBin\", value:\n\n    function findFittedBin(i) {\n      for (var _i = 0; _i < this.bins.length; _i++) {\n        var b = this.bins[_i];\n\n        if (!b.weighItem(i) || !b.putItem(i, _Item__WEBPACK_IMPORTED_MODULE_4__[\"StartPosition\"])) {\n          continue;\n        }\n\n        if (b.items.length === 1 && b.items[0] === i) {\n          b.items = [];\n        }\n\n        return b;\n      }\n      return null;\n    } }, { key: \"getBiggerBinThan\", value:\n\n    function getBiggerBinThan(b) {\n      var v = b.getVolume();\n      for (var _i = 0; _i < this.bins; _i++) {\n        var b2 = this.bins[_i];\n        if (b2.getVolume() > v) {\n          return b2;\n        }\n      }\n      return null;\n    } }, { key: \"unfitItem\", value:\n\n    function unfitItem() {\n      if (this.items.length === 0) {\n        return;\n      }\n      this.unfitItems.push(this.items[0]);\n      this.items.splice(0, 1);\n    } }, { key: \"packToBin\", value:\n\n    function packToBin(b, items) {\n      var b2 = null;\n      var unpacked = [];\n      var fit = b.weighItem(items[0]) && b.putItem(items[0], _Item__WEBPACK_IMPORTED_MODULE_4__[\"StartPosition\"]);\n\n      if (!fit) {\n        var _b = this.getBiggerBinThan(b);\n        if (_b) {\n          return this.packToBin(_b, items);\n        }\n        return this.items;\n      }\n\n      // Pack unpacked items.\n      for (var _i = 1; _i < this.items.length; _i++) {\n        var fitted = false;\n        var item = this.items[_i];\n\n        if (b.weighItem(item)) {\n          // Try available pivots in current bin that are not intersect with\n          // existing items in current bin.\n          lookup:\n          for (var _pt = 0; _pt < 3; _pt++) {\n            for (var _j = 0; _j < b.items.length; _j++) {\n              var pv = void 0;\n              var ib = b.items[_j];\n              switch (_pt) {\n                case _Item__WEBPACK_IMPORTED_MODULE_4__[\"WidthAxis\"]:\n                  pv = [ib.position[0] + ib.getWidth(), ib.position[1], ib.position[2]];\n                  break;\n                case _Item__WEBPACK_IMPORTED_MODULE_4__[\"HeightAxis\"]:\n                  pv = [ib.position[0], ib.position[1] + ib.getHeight(), ib.position[2]];\n                  break;\n                case _Item__WEBPACK_IMPORTED_MODULE_4__[\"DepthAxis\"]:\n                  pv = [ib.position[0], ib.position[1], ib.position[2] + ib.getDepth()];\n                  break;}\n\n\n              if (b.putItem(item, pv)) {\n                fitted = true;\n                break lookup;\n              }\n            }\n          }\n        }\n\n        if (!fitted) {\n          while (b2 !== null) {\n            b2 = this.getBiggerBinThan(b);\n            if (b2) {\n              b2.items.push(item);\n              var left = this.packToBin(b2, b2.items);\n              if (left.length === 0) {\n                b = b2;\n                fitted = true;\n                break;\n              }\n            }\n          }\n\n          if (!fitted) {\n            unpacked.push(item);\n          }\n        }\n      }\n\n      return unpacked;\n    } }, { key: \"pack\", value:\n\n    function pack() {\n      // Sort bins smallest to largest.\n      this.bins.sort(function (a, b) {\n        return a.getVolume() - b.getVolume();\n      });\n\n      // Sort items largest to smallest.\n      this.items.sort(function (a, b) {\n        return b.getVolume() - a.getVolume();\n      });\n\n      while (this.items.length > 0) {\n        var bin = this.findFittedBin(this.items[0]);\n\n        if (bin === null) {\n          this.unfitItem();\n          continue;\n        }\n\n        this.items = this.packToBin(bin, this.items);\n      }\n\n      return null;\n    } }]);return Packer;}();\n\n//# sourceURL=webpack://BinPacking/./3D/Packer.js?");

/***/ }),

/***/ "./3D/index.js":
/*!*********************!*\
  !*** ./3D/index.js ***!
  \*********************/
/*! exports provided: Bin, Item, Packer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Bin\", function() { return _Bin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Item\", function() { return _Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _Packer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Packer */ \"./3D/Packer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Packer\", function() { return _Packer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack://BinPacking/./3D/index.js?");

/***/ }),

/***/ "./lib/log.js":
/*!********************!*\
  !*** ./lib/log.js ***!
  \********************/
/*! exports provided: enableLog, createLogger, log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableLog\", function() { return enableLog; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createLogger\", function() { return createLogger; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\nvar isLogEnabled = false;\nfunction enableLog() {var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n  isLogEnabled = enable;\n}\n\nfunction createLogger() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'binpackingjs';\n  return log.bind(undefined, namespace);\n}\n\nfunction log(namespace) {for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}\n  return isLogEnabled ? console.debug.apply(console, [namespace].concat(args)) : undefined;\n}\n\n//# sourceURL=webpack://BinPacking/./lib/log.js?");

/***/ })

/******/ });
});
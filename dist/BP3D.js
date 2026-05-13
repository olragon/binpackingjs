/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./3D/Bin.js":
/*!*******************!*\
  !*** ./3D/Bin.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Bin; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./3D/util.js\");\n/* harmony import */ var _lib_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/log */ \"./lib/log.js\");\n\n\nconst log = (0,_lib_log__WEBPACK_IMPORTED_MODULE_2__.createLogger)('3D:');\n\nclass Bin {\n\n\n\n\n\n\n\n\n\n  constructor(name, w, h, d, mw) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"name\", '');(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"width\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"height\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"depth\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"maxWeight\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"items\", []);\n    this.name = name;\n    this.width = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(w);\n    this.height = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(h);\n    this.depth = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(d);\n    this.maxWeight = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(mw);\n  }\n\n  getName() {\n    return this.name;\n  }\n\n  getWidth() {\n    return this.width;\n  }\n\n  getHeight() {\n    return this.height;\n  }\n\n  getDepth() {\n    return this.depth;\n  }\n\n  getMaxWeight() {\n    return this.maxWeight;\n  }\n\n  getItems() {\n    return this.items;\n  }\n\n  getVolume() {\n    return this.getWidth() * this.getHeight() * this.getDepth();\n  }\n\n  getPackedWeight() {\n    return this.items.reduce((weight, item) => weight + item.getWeight(), 0);\n  }\n\n  weighItem(item) {\n    const maxWeight = this.getMaxWeight();\n    return !maxWeight || item.getWeight() + this.getPackedWeight() <= maxWeight;\n  }\n\n  /**\n   * Calculate a score for a given item and rotation type.\n   *\n   * Scores are higher for rotations that closest match item dimensions to Bin dimensions.\n   * For example, rotating the item so the longest side is aligned with the longest Bin side.\n   *\n   * Example (Bin is 11 x 8.5 x 5.5, Item is 8.1 x 5.2 x 5.2):\n   *  Rotation 0:\n   *    8.1 / 11  = 0.736\n   *    5.2 / 8.5 = 0.612\n   *    5.2 / 5.5 = 0.945\n   *    -----------------\n   *    0.736 ** 2 + 0.612 ** 2 + 0.945 ** 2 = 1.809\n   *\n   *  Rotation 1:\n   *    8.1 / 8.5 = 0.953\n   *    5.2 / 11 = 0.473\n   *    5.2 / 5.5 = 0.945\n   *    -----------------\n   *    0.953 ** 2 + 0.473 ** 2 + 0.945 ** 2 = 2.025\n   *\n   * @param {Item} item\n   * @param {int} rotationType\n   * @return {float} score\n   */\n  scoreRotation(item, rotationType) {\n    item.rotationType = rotationType;\n    let d = item.getDimension();\n\n    // If the item doesn't fit in the Bin\n    if (this.getWidth() < d[0] || this.getHeight() < d[1] || this.getDepth() < d[2]) {\n      return 0;\n    }\n\n    // Score based on tiling efficiency: how much bin space is usable\n    // when items are packed in a grid along each axis.\n    const widthEfficiency = Math.floor(this.getWidth() / d[0]) * d[0] / this.getWidth();\n    const heightEfficiency = Math.floor(this.getHeight() / d[1]) * d[1] / this.getHeight();\n    const depthEfficiency = Math.floor(this.getDepth() / d[2]) * d[2] / this.getDepth();\n\n    return widthEfficiency * heightEfficiency * depthEfficiency;\n  }\n\n  /**\n   * Calculate the best rotation order for a given Item based on scoreRotation().\n   *\n   * @param {Item} item\n   * @return {Array} Rotation types sorted by their score, DESC\n   */\n  getBestRotationOrder(item) {\n    const rotationScores = {};\n\n    // Score all rotation types\n    for (let i = 0; i < item.allowedRotation.length; i++) {\n      const r = item.allowedRotation[i];\n      rotationScores[r] = this.scoreRotation(item, r);\n    }\n\n    // Sort the rotation types (index of scores object) DESC\n    // and ensure Int values (Object.keys returns strings)\n    const sortedRotations = Object.keys(rotationScores).sort((a, b) => {\n      return rotationScores[b] - rotationScores[a];\n    }).map(Number);\n\n    return sortedRotations;\n  }\n\n  putItem(item, p) {\n    const box = this;\n    let fit = false;\n    const rotations = this.getBestRotationOrder(item);\n    item.position = p;\n\n    for (let i = 0; i < rotations.length; i++) {\n      item.rotationType = rotations[i];\n      let d = item.getDimension();\n\n      if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {\n        fit = false;\n      } else {\n        fit = true;\n\n        for (let j = 0; j < box.items.length; j++) {\n          let _j = box.items[j];\n          if (_j.intersect(item)) {\n            fit = false;\n            break;\n          }\n        }\n\n        if (fit) {\n          box.items.push(item);\n        }\n      }\n\n      log('try to putItem', fit, 'item', item.toString(), 'box', box.toString());\n\n      if (fit) {\n        break;\n      }\n    }\n    return fit;\n  }\n\n  toString() {\n    return `Bin:${this.name} (WxHxD = ${this.getWidth()}x${this.getHeight()}x${this.getDepth()}, MaxWg. = ${this.getMaxWeight()})`;\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./3D/Bin.js?\n}");

/***/ }),

/***/ "./3D/Item.js":
/*!********************!*\
  !*** ./3D/Item.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DepthAxis: function() { return /* binding */ DepthAxis; },\n/* harmony export */   HeightAxis: function() { return /* binding */ HeightAxis; },\n/* harmony export */   RotationTypeStrings: function() { return /* binding */ RotationTypeStrings; },\n/* harmony export */   RotationType_DHW: function() { return /* binding */ RotationType_DHW; },\n/* harmony export */   RotationType_DWH: function() { return /* binding */ RotationType_DWH; },\n/* harmony export */   RotationType_HDW: function() { return /* binding */ RotationType_HDW; },\n/* harmony export */   RotationType_HWD: function() { return /* binding */ RotationType_HWD; },\n/* harmony export */   RotationType_WDH: function() { return /* binding */ RotationType_WDH; },\n/* harmony export */   RotationType_WHD: function() { return /* binding */ RotationType_WHD; },\n/* harmony export */   StartPosition: function() { return /* binding */ StartPosition; },\n/* harmony export */   WidthAxis: function() { return /* binding */ WidthAxis; },\n/* harmony export */   \"default\": function() { return /* binding */ Item; },\n/* harmony export */   rectIntersect: function() { return /* binding */ rectIntersect; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./3D/util.js\");\n\n\nconst RotationType_WHD = 0;\nconst RotationType_HWD = 1;\nconst RotationType_HDW = 2;\nconst RotationType_DHW = 3;\nconst RotationType_DWH = 4;\nconst RotationType_WDH = 5;\n\nconst WidthAxis = 0;\nconst HeightAxis = 1;\nconst DepthAxis = 2;\n\nconst StartPosition = [0, 0, 0];\n\nconst RotationTypeStrings = {\n  [RotationType_WHD]: 'RotationType_WHD (w,h,d)',\n  [RotationType_HWD]: 'RotationType_HWD (h,w,d)',\n  [RotationType_HDW]: 'RotationType_HDW (h,d,w)',\n  [RotationType_DHW]: 'RotationType_DHW (d,h,w)',\n  [RotationType_DWH]: 'RotationType_DWH (d,w,h)',\n  [RotationType_WDH]: 'RotationType_WDH (w,d,h)'\n};\n\nclass Item {\n\n\n\n\n\n\n\n\n\n  // x, y, z\n\n  constructor(name, w, h, d, wg, allowedRotation) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"name\", '');(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"width\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"height\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"depth\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"weight\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"allowedRotation\", [0, 1, 2, 3, 4, 5]);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"rotationType\", RotationType_WHD);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"position\", []);\n    this.name = name;\n    this.width = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(w);\n    this.height = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(h);\n    this.depth = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(d);\n    this.weight = (0,_util__WEBPACK_IMPORTED_MODULE_1__.factoredInteger)(wg);\n    this.allowedRotation = allowedRotation ? allowedRotation : this.allowedRotation;\n  }\n\n  getWidth() {\n    return this.width;\n  }\n\n  getHeight() {\n    return this.height;\n  }\n\n  getDepth() {\n    return this.depth;\n  }\n\n  getWeight() {\n    return this.weight;\n  }\n\n  getRotationType() {\n    return this.rotationType;\n  }\n\n  getAllowedRotation() {\n    return this.allowedRotation;\n  }\n\n  getRotationTypeString() {\n    return RotationTypeStrings[this.getRotationType()];\n  }\n\n  getDimension() {\n    let d;\n    switch (this.rotationType) {\n      case RotationType_WHD:\n        d = [this.getWidth(), this.getHeight(), this.getDepth()];\n        break;\n      case RotationType_HWD:\n        d = [this.getHeight(), this.getWidth(), this.getDepth()];\n        break;\n      case RotationType_HDW:\n        d = [this.getHeight(), this.getDepth(), this.getWidth()];\n        break;\n      case RotationType_DHW:\n        d = [this.getDepth(), this.getHeight(), this.getWidth()];\n        break;\n      case RotationType_DWH:\n        d = [this.getDepth(), this.getWidth(), this.getHeight()];\n        break;\n      case RotationType_WDH:\n        d = [this.getWidth(), this.getDepth(), this.getHeight()];\n        break;\n    }\n    return d;\n  }\n\n  intersect(i2) {\n    return rectIntersect(this, i2, WidthAxis, HeightAxis) &&\n    rectIntersect(this, i2, HeightAxis, DepthAxis) &&\n    rectIntersect(this, i2, WidthAxis, DepthAxis);\n  }\n\n  getVolume() {\n    return this.getWidth() * this.getHeight() * this.getDepth();\n  }\n\n  toString() {\n    return `Item:${this.name} (${this.getRotationTypeString()} = ${this.getDimension().join('x')}, Wg. = ${this.weight})`;\n  }\n}\n\nconst rectIntersect = (i1, i2, x, y) => {\n  let d1, d2, cx1, cy1, cx2, cy2, ix, iy;\n\n  d1 = i1.getDimension();\n  d2 = i2.getDimension();\n\n  cx1 = i1.position[x] + d1[x] / 2;\n  cy1 = i1.position[y] + d1[y] / 2;\n  cx2 = i2.position[x] + d2[x] / 2;\n  cy2 = i2.position[y] + d2[y] / 2;\n\n  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);\n  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);\n\n  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;\n};\n\n//# sourceURL=webpack://BinPacking/./3D/Item.js?\n}");

/***/ }),

/***/ "./3D/Packer.js":
/*!**********************!*\
  !*** ./3D/Packer.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Packer; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\n\n\n\nclass Packer {constructor() {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"bins\",\n\n    []);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"items\",\n    []);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"unfitItems\",\n    []);}\n\n  addBin(bin) {\n    this.bins.push(bin);\n  }\n\n  addItem(item) {\n    this.items.push(item);\n  }\n\n  findFittedBin(i) {\n    for (let _i = 0; _i < this.bins.length; _i++) {\n      let b = this.bins[_i];\n\n      if (!b.weighItem(i) || !b.putItem(i, _Item__WEBPACK_IMPORTED_MODULE_2__.StartPosition)) {\n        continue;\n      }\n\n      if (b.items.length === 1 && b.items[0] === i) {\n        b.items = [];\n      }\n\n      return b;\n    }\n    return null;\n  }\n\n  getBiggerBinThan(b) {\n    let v = b.getVolume();\n    for (let _i = 0; _i < this.bins; _i++) {\n      let b2 = this.bins[_i];\n      if (b2.getVolume() > v) {\n        return b2;\n      }\n    }\n    return null;\n  }\n\n  unfitItem() {\n    if (this.items.length === 0) {\n      return;\n    }\n    this.unfitItems.push(this.items[0]);\n    this.items.splice(0, 1);\n  }\n\n  packToBin(b, items) {\n    let b2 = null;\n    let unpacked = [];\n    let fit = b.weighItem(items[0]) && b.putItem(items[0], _Item__WEBPACK_IMPORTED_MODULE_2__.StartPosition);\n\n    if (!fit) {\n      let b2 = this.getBiggerBinThan(b);\n      if (b2) {\n        return this.packToBin(b2, items);\n      }\n      return this.items;\n    }\n\n    // Pack unpacked items.\n    for (let _i = 1; _i < this.items.length; _i++) {\n      let fitted = false;\n      let item = this.items[_i];\n\n      if (b.weighItem(item)) {\n        // Try available pivots in current bin that are not intersect with\n        // existing items in current bin.\n        lookup:\n        for (let _pt = 0; _pt < 3; _pt++) {\n          for (let _j = 0; _j < b.items.length; _j++) {\n            let pv;\n            let ib = b.items[_j];\n            let d = ib.getDimension();\n            switch (_pt) {\n              case _Item__WEBPACK_IMPORTED_MODULE_2__.WidthAxis:\n                pv = [ib.position[0] + d[0], ib.position[1], ib.position[2]];\n                break;\n              case _Item__WEBPACK_IMPORTED_MODULE_2__.HeightAxis:\n                pv = [ib.position[0], ib.position[1] + d[1], ib.position[2]];\n                break;\n              case _Item__WEBPACK_IMPORTED_MODULE_2__.DepthAxis:\n                pv = [ib.position[0], ib.position[1], ib.position[2] + d[2]];\n                break;\n            }\n\n            if (b.putItem(item, pv)) {\n              fitted = true;\n              break lookup;\n            }\n          }\n        }\n      }\n\n      if (!fitted) {\n        while (b2 !== null) {\n          b2 = this.getBiggerBinThan(b);\n          if (b2) {\n            b2.items.push(item);\n            let left = this.packToBin(b2, b2.items);\n            if (left.length === 0) {\n              b = b2;\n              fitted = true;\n              break;\n            }\n          }\n        }\n\n        if (!fitted) {\n          unpacked.push(item);\n        }\n      }\n    }\n\n    return unpacked;\n  }\n\n  pack() {\n    // Sort bins smallest to largest.\n    this.bins.sort((a, b) => {\n      return a.getVolume() - b.getVolume();\n    });\n\n    // Sort items largest to smallest.\n    this.items.sort((a, b) => {\n      return b.getVolume() - a.getVolume();\n    });\n\n    while (this.items.length > 0) {\n      let bin = this.findFittedBin(this.items[0]);\n\n      if (bin === null) {\n        this.unfitItem();\n        continue;\n      }\n\n      this.items = this.packToBin(bin, this.items);\n    }\n\n    return null;\n  }\n}\n\n//# sourceURL=webpack://BinPacking/./3D/Packer.js?\n}");

/***/ }),

/***/ "./3D/index.js":
/*!*********************!*\
  !*** ./3D/index.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Bin: function() { return /* reexport safe */ _Bin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   Item: function() { return /* reexport safe */ _Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; },\n/* harmony export */   Packer: function() { return /* reexport safe */ _Packer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\n/* harmony import */ var _Packer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Packer */ \"./3D/Packer.js\");\n\n\n\n\n\n\n//# sourceURL=webpack://BinPacking/./3D/index.js?\n}");

/***/ }),

/***/ "./3D/util.js":
/*!********************!*\
  !*** ./3D/util.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   factoredInteger: function() { return /* binding */ factoredInteger; }\n/* harmony export */ });\n/**\n * Precision to retain in factoredInteger()\n */\nconst FACTOR = 5;\n\n/**\n * Factor a number by FACTOR and round to the nearest whole number\n */\nconst factoredInteger = (value) =>\nMath.round(value * 10 ** FACTOR);\n\n//# sourceURL=webpack://BinPacking/./3D/util.js?\n}");

/***/ }),

/***/ "./lib/log.js":
/*!********************!*\
  !*** ./lib/log.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createLogger: function() { return /* binding */ createLogger; },\n/* harmony export */   enableLog: function() { return /* binding */ enableLog; },\n/* harmony export */   log: function() { return /* binding */ log; }\n/* harmony export */ });\nlet isLogEnabled = false;\nfunction enableLog(enable = true) {\n  isLogEnabled = enable;\n}\n\nfunction createLogger(namespace = 'binpackingjs') {\n  return log.bind(undefined, namespace);\n}\n\nfunction log(namespace, ...args) {\n  return isLogEnabled ? console.debug.apply(console, [namespace].concat(args)) : undefined;\n}\n\n//# sourceURL=webpack://BinPacking/./lib/log.js?\n}");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _defineProperty; }\n/* harmony export */ });\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ \"../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js\");\n\nfunction _defineProperty(e, r, t) {\n  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(r)) in e ? Object.defineProperty(e, r, {\n    value: t,\n    enumerable: !0,\n    configurable: !0,\n    writable: !0\n  }) : e[r] = t, e;\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/defineProperty.js?\n}");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ toPrimitive; }\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"../node_modules/@babel/runtime/helpers/esm/typeof.js\");\n\nfunction toPrimitive(t, r) {\n  if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(t) || !t) return t;\n  var e = t[Symbol.toPrimitive];\n  if (void 0 !== e) {\n    var i = e.call(t, r || \"default\");\n    if (\"object\" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i)) return i;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (\"string\" === r ? String : Number)(t);\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/toPrimitive.js?\n}");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ toPropertyKey; }\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"../node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ \"../node_modules/@babel/runtime/helpers/esm/toPrimitive.js\");\n\n\nfunction toPropertyKey(t) {\n  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(t, \"string\");\n  return \"symbol\" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(i) ? i : i + \"\";\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js?\n}");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _typeof; }\n/* harmony export */ });\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/typeof.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./3D/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
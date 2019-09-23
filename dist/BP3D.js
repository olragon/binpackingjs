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

/***/ "./3D/Bin.js":
/*!*******************!*\
  !*** ./3D/Bin.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bin; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Bin =\n/*#__PURE__*/\nfunction () {\n  function Bin(name, w, h, d, mw) {\n    _classCallCheck(this, Bin);\n\n    _defineProperty(this, \"name\", '');\n\n    _defineProperty(this, \"width\", 0);\n\n    _defineProperty(this, \"height\", 0);\n\n    _defineProperty(this, \"depth\", 0);\n\n    _defineProperty(this, \"maxWeight\", 0);\n\n    _defineProperty(this, \"items\", []);\n\n    this.name = name;\n    this.width = w;\n    this.height = h;\n    this.depth = d;\n    this.maxWeight = mw;\n  }\n\n  _createClass(Bin, [{\n    key: \"getName\",\n    value: function getName() {\n      return this.name;\n    }\n  }, {\n    key: \"getWidth\",\n    value: function getWidth() {\n      return this.width;\n    }\n  }, {\n    key: \"getHeight\",\n    value: function getHeight() {\n      return this.height;\n    }\n  }, {\n    key: \"getDepth\",\n    value: function getDepth() {\n      return this.depth;\n    }\n  }, {\n    key: \"getMaxWeight\",\n    value: function getMaxWeight() {\n      return this.maxWeight;\n    }\n  }, {\n    key: \"getItems\",\n    value: function getItems() {\n      return this.items;\n    }\n  }, {\n    key: \"getVolume\",\n    value: function getVolume() {\n      return this.getWidth() * this.getHeight() * this.getDepth();\n    }\n  }, {\n    key: \"getPackedWeight\",\n    value: function getPackedWeight() {\n      return this.items.reduce(function (weight, item) {\n        return weight + item.getWeight();\n      }, 0);\n    }\n  }, {\n    key: \"weighItem\",\n    value: function weighItem(item) {\n      var maxWeight = this.getMaxWeight();\n      return !maxWeight || item.getWeight() + this.getPackedWeight() <= maxWeight;\n    }\n  }, {\n    key: \"putItem\",\n    value: function putItem(item, p) {\n      var box = this;\n      var fit = false;\n      item.position = p;\n\n      for (var i = 0; i < 6; i++) {\n        item.rotationType = i;\n        var d = item.getDimension();\n\n        if (box.getWidth() < p[0] + d[0] || box.getHeight() < p[1] + d[1] || box.getDepth() < p[2] + d[2]) {\n          continue;\n        }\n\n        fit = true;\n\n        for (var j = 0; j < box.items.length; j++) {\n          var _j = box.items[j];\n\n          if (_j.intersect(item)) {\n            fit = false;\n            break;\n          }\n        }\n\n        if (fit) {\n          box.items.push(item);\n        }\n\n        return fit;\n      }\n\n      return fit;\n    }\n  }]);\n\n  return Bin;\n}();\n\n\n\n//# sourceURL=webpack://BinPacking/./3D/Bin.js?");

/***/ }),

/***/ "./3D/Item.js":
/*!********************!*\
  !*** ./3D/Item.js ***!
  \********************/
/*! exports provided: RotationType_WHD, RotationType_HWD, RotationType_HDW, RotationType_DHW, RotationType_DWH, RotationType_WDH, WidthAxis, HeightAxis, DepthAxis, StartPosition, RotationTypeStrings, default, rectIntersect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_WHD\", function() { return RotationType_WHD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_HWD\", function() { return RotationType_HWD; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_HDW\", function() { return RotationType_HDW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_DHW\", function() { return RotationType_DHW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_DWH\", function() { return RotationType_DWH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationType_WDH\", function() { return RotationType_WDH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WidthAxis\", function() { return WidthAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HeightAxis\", function() { return HeightAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DepthAxis\", function() { return DepthAxis; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StartPosition\", function() { return StartPosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RotationTypeStrings\", function() { return RotationTypeStrings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Item; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rectIntersect\", function() { return rectIntersect; });\nvar _RotationTypeStrings;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar RotationType_WHD = 0;\nvar RotationType_HWD = 1;\nvar RotationType_HDW = 2;\nvar RotationType_DHW = 3;\nvar RotationType_DWH = 4;\nvar RotationType_WDH = 5;\nvar WidthAxis = 0;\nvar HeightAxis = 1;\nvar DepthAxis = 2;\nvar StartPosition = [0, 0, 0];\nvar RotationTypeStrings = (_RotationTypeStrings = {}, _defineProperty(_RotationTypeStrings, RotationType_WHD, 'RotationType_WHD (w,h,d)'), _defineProperty(_RotationTypeStrings, RotationType_HWD, 'RotationType_HWD (h,w,d)'), _defineProperty(_RotationTypeStrings, RotationType_HDW, 'RotationType_HDW (h,d,w)'), _defineProperty(_RotationTypeStrings, RotationType_DHW, 'RotationType_DHW (d,h,w)'), _defineProperty(_RotationTypeStrings, RotationType_DWH, 'RotationType_DWH (d,w,h)'), _defineProperty(_RotationTypeStrings, RotationType_WDH, 'RotationType_WDH (w,d,h)'), _RotationTypeStrings);\n\nvar Item =\n/*#__PURE__*/\nfunction () {\n  // x, y, z\n  function Item(name, w, h, d, wg) {\n    _classCallCheck(this, Item);\n\n    _defineProperty(this, \"name\", '');\n\n    _defineProperty(this, \"width\", 0);\n\n    _defineProperty(this, \"height\", 0);\n\n    _defineProperty(this, \"depth\", 0);\n\n    _defineProperty(this, \"weight\", 0);\n\n    _defineProperty(this, \"rotationType\", RotationType_WHD);\n\n    _defineProperty(this, \"position\", []);\n\n    this.name = name;\n    this.width = w;\n    this.height = h;\n    this.depth = d;\n    this.weight = wg;\n  }\n\n  _createClass(Item, [{\n    key: \"getWidth\",\n    value: function getWidth() {\n      return this.width;\n    }\n  }, {\n    key: \"getHeight\",\n    value: function getHeight() {\n      return this.height;\n    }\n  }, {\n    key: \"getDepth\",\n    value: function getDepth() {\n      return this.depth;\n    }\n  }, {\n    key: \"getWeight\",\n    value: function getWeight() {\n      return this.weight;\n    }\n  }, {\n    key: \"getRotationType\",\n    value: function getRotationType() {\n      return this.rotationType;\n    }\n  }, {\n    key: \"getRotationTypeString\",\n    value: function getRotationTypeString() {\n      return RotationTypeStrings[this.getRotationType()];\n    }\n  }, {\n    key: \"getDimension\",\n    value: function getDimension() {\n      var d;\n\n      switch (this.rotationType) {\n        case RotationType_WHD:\n          d = [this.getWidth(), this.getHeight(), this.getDepth()];\n          break;\n\n        case RotationType_HWD:\n          d = [this.getHeight(), this.getWidth(), this.getDepth()];\n          break;\n\n        case RotationType_HDW:\n          d = [this.getHeight(), this.getDepth(), this.getWidth()];\n          break;\n\n        case RotationType_DHW:\n          d = [this.getDepth(), this.getHeight(), this.getWidth()];\n          break;\n\n        case RotationType_DWH:\n          d = [this.getDepth(), this.getWidth(), this.getHeight()];\n          break;\n\n        case RotationType_WDH:\n          d = [this.getWidth(), this.getDepth(), this.getHeight()];\n          break;\n      }\n\n      return d;\n    }\n  }, {\n    key: \"intersect\",\n    value: function intersect(i2) {\n      return rectIntersect(this, i2, WidthAxis, HeightAxis) && rectIntersect(this, i2, HeightAxis, DepthAxis) && rectIntersect(this, i2, WidthAxis, DepthAxis);\n    }\n  }, {\n    key: \"getVolume\",\n    value: function getVolume() {\n      return this.getWidth() * this.getHeight() * this.getDepth();\n    }\n  }]);\n\n  return Item;\n}();\n\n\nvar rectIntersect = function rectIntersect(i1, i2, x, y) {\n  var d1, d2, cx1, cy1, cx2, cy2, ix, iy;\n  d1 = i1.getDimension();\n  d2 = i2.getDimension();\n  cx1 = i1.position[x] + d1[x] / 2;\n  cy1 = i1.position[y] + d1[y] / 2;\n  cx2 = i2.position[x] + d2[x] / 2;\n  cy2 = i2.position[y] + d2[y] / 2;\n  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);\n  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);\n  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;\n};\n\n//# sourceURL=webpack://BinPacking/./3D/Item.js?");

/***/ }),

/***/ "./3D/Packer.js":
/*!**********************!*\
  !*** ./3D/Packer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Packer; });\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar Packer =\n/*#__PURE__*/\nfunction () {\n  function Packer() {\n    _classCallCheck(this, Packer);\n\n    _defineProperty(this, \"bins\", []);\n\n    _defineProperty(this, \"items\", []);\n\n    _defineProperty(this, \"unfitItems\", []);\n  }\n\n  _createClass(Packer, [{\n    key: \"addBin\",\n    value: function addBin(bin) {\n      this.bins.push(bin);\n    }\n  }, {\n    key: \"addItem\",\n    value: function addItem(item) {\n      this.items.push(item);\n    }\n  }, {\n    key: \"findFittedBin\",\n    value: function findFittedBin(i) {\n      for (var _i = 0; _i < this.bins.length; _i++) {\n        var b = this.bins[_i];\n\n        if (!b.weighItem(i) || !b.putItem(i, _Item__WEBPACK_IMPORTED_MODULE_1__[\"StartPosition\"])) {\n          continue;\n        }\n\n        if (b.items.length === 1 && b.items[0] === i) {\n          b.items = [];\n        }\n\n        return b;\n      }\n\n      return null;\n    }\n  }, {\n    key: \"getBiggerBinThan\",\n    value: function getBiggerBinThan(b) {\n      var v = b.getVolume();\n\n      for (var _i = 0; _i < this.bins; _i++) {\n        var b2 = this.bins[_i];\n\n        if (b2.getVolume() > v) {\n          return b2;\n        }\n      }\n\n      return null;\n    }\n  }, {\n    key: \"unfitItem\",\n    value: function unfitItem() {\n      if (this.items.length === 0) {\n        return;\n      }\n\n      this.unfitItems.push(this.items[0]);\n      this.items.splice(0, 1);\n    }\n  }, {\n    key: \"packToBin\",\n    value: function packToBin(b, items) {\n      var b2 = null;\n      var unpacked = [];\n      var fit = b.weighItem(items[0]) && b.putItem(items[0], _Item__WEBPACK_IMPORTED_MODULE_1__[\"StartPosition\"]);\n\n      if (!fit) {\n        var _b = this.getBiggerBinThan(b);\n\n        if (_b) {\n          return this.packToBin(_b, items);\n        }\n\n        return this.items;\n      } // Pack unpacked items.\n\n\n      for (var _i = 1; _i < this.items.length; _i++) {\n        var fitted = false;\n        var item = this.items[_i];\n\n        if (b.weighItem(item)) {\n          // Try available pivots in current bin that are not intersect with\n          // existing items in current bin.\n          lookup: for (var _pt = 0; _pt < 3; _pt++) {\n            for (var _j = 0; _j < b.items.length; _j++) {\n              var pv = void 0;\n              var ib = b.items[_j];\n\n              switch (_pt) {\n                case _Item__WEBPACK_IMPORTED_MODULE_1__[\"WidthAxis\"]:\n                  pv = [ib.position[0] + ib.getWidth(), ib.position[1], ib.position[2]];\n                  break;\n\n                case _Item__WEBPACK_IMPORTED_MODULE_1__[\"HeightAxis\"]:\n                  pv = [ib.position[0], ib.position[1] + ib.getHeight(), ib.position[2]];\n                  break;\n\n                case _Item__WEBPACK_IMPORTED_MODULE_1__[\"DepthAxis\"]:\n                  pv = [ib.position[0], ib.position[1], ib.position[2] + ib.getDepth()];\n                  break;\n              }\n\n              if (b.putItem(item, pv)) {\n                fitted = true;\n                break lookup;\n              }\n            }\n          }\n        }\n\n        if (!fitted) {\n          while (b2 !== null) {\n            b2 = this.getBiggerBinThan(b);\n\n            if (b2) {\n              b2.items.push(item);\n              var left = this.packToBin(b2, b2.items);\n\n              if (left.length === 0) {\n                b = b2;\n                fitted = true;\n                break;\n              }\n            }\n          }\n\n          if (!fitted) {\n            unpacked.push(item);\n          }\n        }\n      }\n\n      return unpacked;\n    }\n  }, {\n    key: \"pack\",\n    value: function pack() {\n      this.bins.sort(function (a, b) {\n        return a.getVolume() > b.getVolume();\n      });\n      this.items.sort(function (a, b) {\n        return a.getVolume() > b.getVolume();\n      });\n\n      while (this.items.length > 0) {\n        var bin = this.findFittedBin(this.items[0]);\n\n        if (bin === null) {\n          this.unfitItem();\n          continue;\n        }\n\n        this.items = this.packToBin(bin, this.items);\n      }\n\n      return null;\n    }\n  }]);\n\n  return Packer;\n}();\n\n\n\n//# sourceURL=webpack://BinPacking/./3D/Packer.js?");

/***/ }),

/***/ "./3D/index.js":
/*!*********************!*\
  !*** ./3D/index.js ***!
  \*********************/
/*! exports provided: Bin, Item, Packer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bin */ \"./3D/Bin.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Bin\", function() { return _Bin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ \"./3D/Item.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Item\", function() { return _Item__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _Packer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Packer */ \"./3D/Packer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Packer\", function() { return _Packer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack://BinPacking/./3D/index.js?");

/***/ })

/******/ });
});
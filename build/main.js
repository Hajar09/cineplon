require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _volleyball = __webpack_require__(4);

var _volleyball2 = _interopRequireDefault(_volleyball);

var _passport = __webpack_require__(5);

var _passport2 = _interopRequireDefault(_passport);

var _db = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var SERV_P = process.env.SERV_P;


(0, _db.connect)();
app.use(_volleyball2.default);
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

//app.use('/api', )

app.get('/', function (req, res) {
    res.send("ça marche");
});

app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.message = 'route indisponible';
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: {
            msg: error.message
        }
    });
});

app.listen(SERV_P, function (req, res) {
    console.log("My app is running on port: " + SERV_P);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("volleyball");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mongoose = __webpack_require__(7);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
var connect = exports.connect = function connect() {
  return _mongoose2.default.connect('mongodb://localhost/cineplon_db');
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map
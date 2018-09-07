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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
// const video = document.getElementById('video');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners

// Mouse Movement
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

//Keyboard directions
var d = void 0;
addEventListener("keydown", function (event) {
    switch (event.which || event.keyCode) {
        case 37:
            d = "LEFT";
            break;
        case 39:
            d = "RIGHT";
            break;
        case 32:
            d = "SPACE";
            break;
        default:
            break;
    }
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Player's particle
function Particle(x, y, radius, color) {
    var _this = this;

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.cosRadians = Math.PI;
    this.velocity = 0.07;

    this.draw = function () {
        c.beginPath();
        c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        c.fillStyle = _this.color;
        c.fill();
        c.closePath();
    };

    //Move point using mouse
    // this.update = () => {
    //     //Move points in relation to time
    //     // this.radians += this.velocity;
    //     // this.x = mouse.x + Math.cos(this.radians) * 100;
    //     // this.y = mouse.y + Math.sin(this.radians) * 100;
    //     this.x = mouse.x
    //     this.y = mouse.y
    //     // console.log(Math.cos(this.radians) * 100);

    //     this.draw()
    // }

    //Point moves on its own
    // this.update = () => {
    //     //Move points in relation to time
    //     this.radians += this.velocity;
    //     this.x = x + Math.cos(this.radians) * 100;
    //     this.y = y + Math.sin(this.radians) * 100;

    //     // console.log(Math.cos(this.radians) * 100);

    //     this.draw()
    // }

    //Move player's ship with keyboard
    // Can use the same logic for gyroscope
    this.update = function () {
        if (d == "LEFT") {
            _this.radians -= _this.velocity;
            _this.x = x + Math.sin(_this.radians) * 180;
            _this.y = centerY + Math.cos(_this.radians) * 180;
        } else if (d == "RIGHT") {
            _this.radians += _this.velocity;
            _this.x = x + Math.sin(_this.radians) * 180;
            _this.y = centerY + Math.cos(_this.radians) * 180;
        } else if (d == "SPACE") {
            _this.x;
            _this.y;
        }
        _this.draw();
    };
}

//Enemy squishys
function Squishy(x, y, radius, color, isOutOfBounds) {
    var _this2 = this;

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = _utils2.default.randomIntFromRange(0.2, 0.5);
    this.radiansX = Math.cos(_utils2.default.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.radiansY = Math.sin(_utils2.default.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.isTrue = isOutOfBounds;

    this.draw = function () {
        c.beginPath();
        c.arc(_this2.x, _this2.y, _this2.radius, 0, Math.PI * 2, false);
        c.fillStyle = _this2.color;
        c.fill();
        c.closePath();
    };

    //linear movement along x,y
    this.update = function () {
        _this2.x += _this2.radiansX * _this2.velocity;
        _this2.y += _this2.radiansY * _this2.velocity;
        _this2.draw();
    };

    this.checkBoundary = function () {
        if (_this2.x >= 0 && _this2.x <= canvas.width && _this2.y >= 0 && _this2.y <= canvas.height) {
            _this2.isTrue = false;
        } else {
            _this2.isTrue = true;
        }
    };
}

// Implementation for user's and enemy's cigarette squishy things
var ship = void 0,
    enemies = void 0;

function initEnemies() {
    enemies = [];
    for (var i = 0; i < _utils2.default.randomIntFromRange(1, 3); i++) {
        enemies.push(new Squishy(centerX, centerY, 20, _utils2.default.randomColor(colors), false));
    }
    console.log(enemies);
}

function init() {
    ship = [];
    var startingYCoord = centerY + Math.cos(0) * 180;
    ship.push(new Particle(centerX, startingYCoord, 10, "red"));
    console.log(ship);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    //Move enemies
    enemies.forEach(function (enemy) {
        enemy.update();
        enemy.checkBoundary();
        if (enemy.isTrue == true) {
            enemies.splice(enemies.indexOf(enemy), 1);
            console.log(enemies);
        }

        if (enemies.length == 0) {
            setTimeout(initEnemies(), 200);
        }
    });
    //create one particle
    ship[0].update();
}

//the very first wave of enemies and your particle
initEnemies();
init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    var number = Math.random() * (max - min + 1) + min;
    return number.toFixed(1);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
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

/***/ "./src/assets/images/alien.png":
/*!*************************************!*\
  !*** ./src/assets/images/alien.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/public/icons/alien.png";

/***/ }),

/***/ "./src/assets/images/coin.png":
/*!************************************!*\
  !*** ./src/assets/images/coin.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/public/icons/coin.png";

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _alien = __webpack_require__(/*! ./assets/images/alien.png */ "./src/assets/images/alien.png");

var _alien2 = _interopRequireDefault(_alien);

var _coin = __webpack_require__(/*! ./assets/images/coin.png */ "./src/assets/images/coin.png");

var _coin2 = _interopRequireDefault(_coin);

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

var ALIEN = new Image();
ALIEN.src = _alien2.default;

var COIN_IMG = new Image();
COIN_IMG.src = _coin2.default;

var COIN_SPRITE = new Sprite({
    context: c,
    width: 1000,
    height: 1000,
    image: COIN_IMG,
    numberOfFrames: 1,
    ticksPerFrame: 10
});

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

addEventListener("keyup", function (event) {
    d = "";
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
    this.spriteX = 0;
    this.spriteY = 0;

    this.draw = function () {
        c.beginPath();
        c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        c.fillStyle = _this.color;
        c.fill();
        c.closePath();
        _this.spriteX = _this.x - (ALIEN.width - _this.radius) / 2;
        _this.spriteY = _this.y - (ALIEN.height - _this.radius) / 2;
        c.drawImage(ALIEN, _this.spriteX, _this.spriteY);
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
    // }†


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
        COIN_SPRITE.draw();
    };

    //linear movement along x,y
    this.update = function () {
        _this2.x += _this2.radiansX * _this2.velocity;
        _this2.y += _this2.radiansY * _this2.velocity;
        _this2.draw();
        COIN_SPRITE.update();
        COIN_SPRITE.x = _this2.x;
        COIN_SPRITE.y = _this2.y;
        COIN_SPRITE.scaleRatio += 1;
    };

    this.checkBoundary = function () {
        if (_this2.x >= 0 && _this2.x <= canvas.width && _this2.y >= 0 && _this2.y <= canvas.height) {
            _this2.isTrue = false;
        } else {
            _this2.isTrue = true;
        }
    };
}

//Score
function scoreKeeper(width, font, posX, posY, text) {
    var _this3 = this;

    this.width = width;
    this.x = posX;
    this.y = posY;
    this.font = font;
    this.text = text;

    this.draw = function () {
        c.font = _this3.width + " " + _this3.font;
        c.fillStyle = "red";
        c.fillText(_this3.text, _this3.x, _this3.y);
    };

    this.update = function () {
        _this3.text = _this3.text + 1;

        _this3.draw();
    };
}

//sprite animation
function Sprite(options) {
    var _this4 = this;

    this.context = options.context;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.x = 0;
    this.y = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;
    this.scaleRatio = 0.1;

    this.draw = function () {
        _this4.context.drawImage(_this4.image, _this4.frameIndex * _this4.width / _this4.numberOfFrames, 0, _this4.width / _this4.numberOfFrames, _this4.height, _this4.x, _this4.y, _this4.width / _this4.numberOfFrames, _this4.height);
    };

    this.update = function () {
        _this4.tickCount += 1;
        if (_this4.tickCount > _this4.ticksPerFrame) {
            _this4.tickCount = 0;
            if (_this4.scaleRatio > 1) {
                _this4.scaleRatio = 0;
            }
            // If the current frame index is in range
            if (_this4.frameIndex < _this4.numberOfFrames - 1) {
                // Go to the next frame
                _this4.frameIndex += 1;
            } else {
                _this4.frameIndex = 0;
            }
        }
    };

    return this;
}

// Implementation for user's and enemy's cigarette squishy things
var ship = void 0,
    scoreBoard = void 0,
    enemies = void 0;

function initEnemies() {
    enemies = [];
    for (var i = 0; i < _utils2.default.randomIntFromRange(1, 3); i++) {
        enemies.push(new Squishy(centerX, centerY, 20, _utils2.default.randomColor(colors), false));
    }
    console.log(enemies);
}

function init() {
    scoreBoard = new scoreKeeper("20px", "Consolas", 600, 50, 0);
    ship = [];
    var startingYCoord = centerY + Math.cos(0) * 180;
    ship.push(new Particle(centerX, startingYCoord, 10, "red"));
    console.log(ship);
}

//collision detection
function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// Animation Loop
function animate() {
    scoreBoard.draw();

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    //Move enemies
    enemies.forEach(function (enemy) {
        scoreBoard.draw();
        enemy.update();
        enemy.checkBoundary();
        if (enemy.isTrue == true) {
            enemies.splice(enemies.indexOf(enemy), 1);
            // console.log(enemies);
        }

        if (enemies.length == 0) {
            setTimeout(initEnemies(), 200);
        }

        //collision detection

        //check enemy color
        if (enemy.color == "#2185C5") {
            if (getDistance(enemy.x, enemy.y, ship[0].x, ship[0].y) < enemy.radius + ship[0].radius) {
                enemy.color = "#FF00FF";
                scoreBoard.update();
            }
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
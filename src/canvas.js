import utils from './utils';
import alien from './assets/images/alien.png';
import coin from './assets/images/coin.png';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// const video = document.getElementById('video');

canvas.width = window.innerWidth
canvas.height = window.innerHeight


const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const ALIEN = new Image()
ALIEN.src = alien

const COIN_IMG = new Image()
COIN_IMG.src = coin

const COIN_SPRITE = new Sprite({
    context:c,
    width:1000,
    height:1000,
    image: COIN_IMG,
    numberOfFrames: 1,
    ticksPerFrame: 10
})

// Event Listeners

// Mouse Movement
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

//Keyboard directions
let d;
addEventListener("keydown", (event) => {
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

addEventListener("keyup", (event) => {
    d = "";
});

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Player's particle
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.cosRadians = Math.PI
    this.velocity = 0.07;
    this.spriteX = 0
    this.spriteY = 0

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        this.spriteX = this.x - ((ALIEN.width - this.radius) / 2)
        this.spriteY = this.y - ((ALIEN.height - this.radius) / 2)
        c.drawImage(ALIEN, this.spriteX, this.spriteY)
    }

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
    this.update = () => {
        if (d == "LEFT") {
            this.radians -= this.velocity;
            this.x = x + Math.sin(this.radians) * 180;
            this.y = centerY + Math.cos(this.radians) * 180;
        } else if (d == "RIGHT") {
            this.radians += this.velocity;
            this.x = x + Math.sin(this.radians) * 180;
            this.y = centerY + Math.cos(this.radians) * 180;
        } else if (d == "SPACE") {
            this.x;
            this.y;
        }
        this.draw()
    }
}

//Enemy squishys
function Squishy(x, y, radius, color, isOutOfBounds) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = utils.randomIntFromRange(0.2, 0.5);
    this.radiansX = Math.cos(utils.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.radiansY = Math.sin(utils.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.isTrue = isOutOfBounds;


    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        COIN_SPRITE.draw()
    }

    //linear movement along x,y
    this.update = () => {
        this.x += this.radiansX * this.velocity;
        this.y += this.radiansY * this.velocity;
        this.draw()
        COIN_SPRITE.update()
        COIN_SPRITE.x = this.x;
        COIN_SPRITE.y = this.y;
        COIN_SPRITE.scaleRatio += 1
    }

    this.checkBoundary = () => {
        if (this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height) {
            this.isTrue = false;
        } else {
            this.isTrue = true;
        }
    }
}

//Score
function scoreKeeper(width, font, posX, posY, text) {
    this.width = width;
    this.x = posX;
    this.y = posY;
    this.font = font;
    this.text = text;

    this.draw = () => {
        c.font = this.width + " " + this.font;
        c.fillStyle = "red";
        c.fillText(this.text, this.x, this.y);
    }

    this.update = () => {
        this.text = this.text + 1;

        this.draw();
    }
}

//sprite animation
function Sprite(options){
    this.context = options.context
    this.width = options.width
    this.height = options.height
    this.image = options.image
    this.frameIndex = 0
    this.tickCount = 0
    this.x = 0
    this.y = 0
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1
    this.scaleRatio = 0.1;

    this.draw = () =>{
        this.context.drawImage(
            this.image, 
            this.frameIndex * this.width/this.numberOfFrames, 
            0, 
            this.width/this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    this.update = () => {
        this.tickCount += 1;
        if(this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if(this.scaleRatio > 1) {
                this.scaleRatio = 0
            }
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    return this;
}

// Implementation for user's and enemy's cigarette squishy things
let ship, scoreBoard, enemies;

function initEnemies() {
    enemies = []
    for (let i = 0; i < (utils.randomIntFromRange(1, 3)); i++) {
        enemies.push(new Squishy(centerX, centerY, 20, utils.randomColor(colors), false));
    }
    console.log(enemies);
}


function init() {
    scoreBoard = new scoreKeeper("20px", "Consolas", 600, 50, 0);
    ship = [];
    let startingYCoord = (centerY + (Math.cos(0) * 180))
    ship.push(new Particle(centerX, startingYCoord, 10, "red"));
    console.log(ship);
}

//collision detection
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return (Math.sqrt(Math.pow(xDistance, 2) + (Math.pow(yDistance, 2))));
}
// Animation Loop
function animate() {
    scoreBoard.draw();
    
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    //Move enemies
    enemies.forEach((enemy) => {
        scoreBoard.draw();
        enemy.update();
        enemy.checkBoundary();
        if (enemy.isTrue == true) {
            enemies.splice(enemies.indexOf(enemy), 1);
            // console.log(enemies);
        }

        if (enemies.length == 0) {
            setTimeout(initEnemies(), 200)
        }

        //collision detection

        //check enemy color
        if (enemy.color == "#2185C5") {
            if (getDistance(enemy.x, enemy.y, ship[0].x, ship[0].y) < enemy.radius + ship[0].radius) {
                enemy.color = "#FF00FF"
                scoreBoard.update();
            }
        }
    });
    //create one particle
    ship[0].update();

}

//the very first wave of enemies and your particle
initEnemies();
init()
animate()

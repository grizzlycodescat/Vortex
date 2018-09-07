import utils from './utils';

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

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius,0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
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
    this.update = () => {
        if (d=="LEFT") {
            this.radians -= this.velocity;
            this.x = x + Math.sin(this.radians) * 180;
            this.y = centerY + Math.cos(this.radians) * 180;
        } else if (d=="RIGHT") {
            this.radians += this.velocity;
            this.x = x + Math.sin(this.radians) * 180;
            this.y = centerY + Math.cos(this.radians) * 180;
        } else if (d=="SPACE") {
            this.x;
            this.y;
        }
        this.draw()
    }
}

//Enemy squishys
function Squishy(x, y, radius, color,isOutOfBounds) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = utils.randomIntFromRange(0.2,0.5);
    this.radiansX = Math.cos(utils.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.radiansY = Math.sin(utils.randomIntFromRange(-Math.PI, Math.PI)) * (Math.PI * 2);
    this.isTrue = isOutOfBounds;


    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    //linear movement along x,y
    this.update = () => {
        this.x += this.radiansX * this.velocity;
        this.y += this.radiansY * this.velocity;       
        this.draw()
    }

    this.checkBoundary = () => {
        if (this.x >= 0 && this.x <= canvas.width && this.y >= 0 && this.y <= canvas.height) {
           this.isTrue = false;
        } else {
           this.isTrue = true;
        }
    }
}

// Implementation for user's and enemy's cigarette squishy things
let ship, enemies;

function initEnemies() {
    enemies = []
    for (let i = 0; i < (utils.randomIntFromRange(1, 3)); i++) {
        enemies.push(new Squishy(centerX, centerY, 20, utils.randomColor(colors), false));
    }
    console.log(enemies);
}


function init() {
    ship = [];
    let startingYCoord = (centerY + (Math.cos(0) * 180))
    ship.push(new Particle(centerX, startingYCoord, 10, "red"));
    console.log(ship);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    //Move enemies
    enemies.forEach((enemy) => {
        enemy.update();
        enemy.checkBoundary();
        if(enemy.isTrue == true) {
            enemies.splice(enemies.indexOf(enemy),1);
            console.log(enemies);
        }
        
        if(enemies.length == 0) {
            setTimeout(initEnemies(),200)
        }
    });
    //create one particle
    ship[0].update();
}

//the very first wave of enemies and your particle
initEnemies();
init()
animate()


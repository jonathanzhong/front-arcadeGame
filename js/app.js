// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //Once enemies move out of the canvas, it is reset.
    if (this.x > 500) {
        this.x = 0;
        this.randamSpeed();
    }

    var bugXRightEdge = this.x + 50;
    var bugXLeftEdge = this.x - 50;
    var bugYTopEdge = this.y - 50;
    var bugYBottomEdge = this.y + 50;

    //Collision detection between player and enemies.
    if (player.x > bugXLeftEdge && player.x < bugXRightEdge && player.y > bugYTopEdge && player.y < bugYBottomEdge ) {
        player.collisions();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.randamSpeed = function() {
    var speedRandom = Math.floor(Math.random() * 3 + 1) * 70;
    this.speed = speedRandom;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerX = 200;
var playerY = 400;

var Player = function(playerX, playerY) {
    this.x = playerX;
    this.y = playerY;
    this.boundariesCheck = {
        leftBoundary : false,
        rightBoundary : false,
        bottomBoundary : true
    };
    this.sprite = 'images/char-boy.png'
}

Player.prototype.update = function() {
    this.x = this.x;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.collisions = function() {
    this.x = playerX;
    this.y = playerY;
    this.resetCheckBoundaries();
}

Player.prototype.handleInput = function(event) {
    this.checkBoundaries();

    if (event === "up") {
        if (this.y === 40) {
            this.collisions();
            return null;
        }
        this.y = this.y - 90;
    }

    if (event === "down") {
        if (this.boundariesCheck.bottomBoundary) {
            return null;
        }
        this.y = this.y + 90;
    }

    if (event === "right") {
        if (this.boundariesCheck.rightBoundary) {
            return null;
        }
        this.x = this.x + 100;
    }

    if (event === "left") {
        if (this.boundariesCheck.leftBoundary) {
            return null;
        }
        this.x = this.x - 100;
    }
}

Player.prototype.checkBoundaries = function() {
    if (this.x === 0) {
        this.setHorizontalBoundariesState(true, false);
    } else if (this.x === 400) {
        this.setHorizontalBoundariesState(false, true);
    } else {
        this.setHorizontalBoundariesState(false, false);
    }

    if (this.y === 400) {
        this.boundariesCheck.bottomBoundary = true;
    } else {
        this.boundariesCheck.bottomBoundary = false;
    }
}

Player.prototype.resetCheckBoundaries = function() {
    this.setHorizontalBoundariesState(false, false);
    this.boundariesCheck.bottomBoundary = true;
}

Player.prototype.setHorizontalBoundariesState = function(leftBoundaryState, rightBoundaryState) {
    this.boundariesCheck.leftBoundary = leftBoundaryState;
    this.boundariesCheck.rightBoundary = rightBoundaryState;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();

//Instantiate all enemies
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 3 + 1) * 70;
    allEnemies.push(new Enemy(0, 60 + 85 * i, tempSpeed));
}


var player = new Player(playerX, playerY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

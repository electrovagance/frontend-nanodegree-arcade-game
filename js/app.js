'use strict';

// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // sets the starting coordinates of Enemy
    const yCoordinates = [60, 145, 230];
    this.x = Math.floor(Math.random() * 500 - 500);
    // returns random y coordinate from the yCoordinates set 
    this.y = yCoordinates[Math.floor(Math.random() * 3)];

    this.speed = Math.random() * 3 +3;
    // this.speed = 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    this.x = Math.floor(this.x + this.speed);
    ctx.drawImage(Resources.get(this.sprite), this.x*dt, this.y);

    // resets x coordiante if bug is off screen
    if (this.x > 700) this.x = -700;
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
}



// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    ctx.drawImage(Resources.get(this.sprite), this.x*dt-10, this.y);
    this.checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  Updates player position
Player.prototype.handleInput = function (allowedKeys) {
    switch (allowedKeys) {
        case 'up':
            if (this.y < 80) {
                console.log('You won!');
                resetGame();
            }
            this.y = this.y - 85;
            break;
        case 'down':
            if (this.y > 300) break;
            this.y = this.y + 85;
            break;
        case 'left':
            if (this.x < 50) break;
            this.x = this.x - 100;
            break;
        case 'right':
            if (this.x > 302) break;
            this.x = this.x + 100;
            break;
    }
    this.render();
}

Player.prototype.checkCollisions = function () {
    // check if any of the enemy is on the same y coordinate   
    const yCoor = allEnemies.map(
        enemy => enemy.y
    );

    const xCoor = allEnemies.map(
        enemy => enemy.x
    );


    for (let i = 0; i < yCoor.length; i++) {
        // checks if player;s or enemy's y coordinate match
        if (yCoor[i] === this.y) {
            // since every enemy has a different speed, we cannot quarantee that every sprite lands
            // on the same exact x coordinate, therefore a range of 140 is given for collusion check
            if (xCoor[i]-70 < this.x && xCoor[i]+70 > this.x) {
                console.log('Collusion!');
                resetGame();
            }
        }
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];

// Place the player object in a variable called player
let player = new Player();


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

function newEnemy() {
    return new Enemy();
}

function resetGame() {
    player = new Player();
    for (let i = 0; i < 6; i++) allEnemies[i] = newEnemy();
}
// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*100)+200);
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
    this.x += this.speed * dt;

// set new random speed for enemy once is off canvas
    if (this.x > 505) {
        this.x = -75;
        this.speed =  Math.floor((Math.random()*100)+200);
    }

// check if player is colliding with any of bug-enemy
    if (!(this.x + 70 < player.x ||
        player.x + 35 < this.x ||
        this.y + 45 < player.y ||
        player.y + 70 < this.y)) {
        player.x = 200;
        player.y = 400;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    // The image/sprite for our player, this uses provided by Udacity helper
    this.sprite = 'images/char-horn-girl.png';
};


// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {

}

// Draw the player on the screen using player's sprite, placed in engine.js
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyPress) {
    let _this = this;

// Once player reach any of water tile - reset it's position to starting point 
// (200 on x-axis, 400 on y-axis)
    if (this.y < 0) {
            if (keyPress === 'up' && this.y > -10) {
        this.y -= 82;
    }
    if (keyPress === 'down' && this.y < 400) {
        this.y += 82;
    }
    if (keyPress === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (keyPress === 'right' && this.x < 400) {
        this.x += 100;
    }

        setTimeout(function() {
            alert('Great job, You won! :)');
            _this.x = 200;
            _this.y = 400;
        }, 30);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

//new instatnces of Enemy pushed to allEnemies array 
(function enemyStart() {
    allEnemies.push(new Enemy(-75, 60, 50));
    allEnemies.push(new Enemy(-75, 140, 100));
    allEnemies.push(new Enemy(-75, 230, 150));
}());

// Place the player object in a variable called player
// setting the player initial position -(200 on x-axis, 400 on y-axis)
let player = new Player(200, 400);

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


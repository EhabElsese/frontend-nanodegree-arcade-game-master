// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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

    //when enemy arrival to canvas end
    if (this.x > 505) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 600);
    }

    //collision between enemy and player 
    if (player.x < this.x + 60 &&
        player.x  + 37 > this.x &&
        player.y < this.y + 25 &&
        player.y + 30 > this.y) {
        player.x = 200;
        player.y = 400;
        player.sprite = 'images/char-cat-girl.png';
    }
    

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var achive = document.getElementById("score");
var score = 0;
achive.innerHTML =  'game result = ' + score;

var player = function(x,y,speed) {

    // player position
    this.y = y;

    this.x = x;
    

    //player speed
    this.speed = speed;

    //player image
    this.sprite = 'images/char-princess-girl.png';

    
};
player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    

    // Check for player reaching top
    if (this.y < 0) {
        this.y = 400;
        this.x = 200;

        score +=1;
        achive.innerHTML = 'game result = ' + score;
        player.sprite = 'images/char-princess-girl.png';
        
    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'down':
            this.y += this.speed + 40;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;

        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 40;
            break;
        
        
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [220, 60, 140];
var player = new player(200, 400, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 600));
    allEnemies.push(enemy);
});



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
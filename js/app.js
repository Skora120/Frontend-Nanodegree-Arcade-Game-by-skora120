// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    if (Math.random() * 10 > 6) {
        this.y = 60;
    } else if (Math.random() * 10 > 3) {
        this.y = 140;
    } else {
        this.y = 220;
    }
    
    if (Math.random() * 10 > 6) {
        this.x = -Math.random() * 100;
    } else if (Math.random() * 10 > 3) {
        this.x = -Math.random() * 100;
    } else {
        this.x = -Math.random() * 100;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x+=dt*100;
    Enemy.prototype.randomMovement(dt);
    //console.log("enemy", this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	//Enemies can;t run over canvas "frame"
    if (this.x > 500) {
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //console.log(this.x);

};


//Enemies movement
Enemy.prototype.randomMovement = function(dt) {
    for (i = 0; i < allEnemies.length; i++) {
        allEnemies[i].x = allEnemies[i].x + dt * 100 * Math.random();
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 430;
    this.speed = 22;
    this.levelDifficult = 1;
    this.life = 3;
    this.textFix = 0;
};

Player.prototype.update = function(dt) {
    Player.prototype.handleInput();
    Enemy.prototype.multiplyEn();
    Player.prototype.simpleHUD(this.life, this.levelDifficult);
};

Player.prototype.handleInput = function(key) {
    //console.log(key, this.x, this.y);
    if (key === "left" && this.x > -10) {
        this.x -= this.speed;
    }
    if (key === "right" && this.x < 420) {
        this.x += this.speed;
    }
    if (key === "up" && this.y > -10) {
        this.y -= this.speed;
    }
    if (key === "down" && this.y < 430) {
        this.y += this.speed;
    }
    if (this.y < 0) {
        Player.prototype.win();
    }

};

Player.prototype.render = function() {
    playerTex = new Image();
    playerTex.src = "images/char-boy.png";
    ctx.drawImage(playerTex, this.x, this.y);
};

Player.prototype.win = function() {
    //console.log("WON", player.life);
    player.y = 430;
    player.levelDifficult++;
    player.textFix = 13;
    Player.prototype.drawCenterText("LEVEL UP!");

};

//When player lose
Player.prototype.lose = function() {
    //console.log("BOOOM", player.life);
    player.y = 430;
    player.life--;
    player.textFix = 13;
    // if player lost (less then 0 hearts)
    if (player.life < 0) {
        player.levelDifficult = 1;
        allEnemies.splice(0, allEnemies.length);
        Enemy.prototype.multiplyEn();
        player.x = 200;
        player.y = 430;
        player.life = 3;
        Player.prototype.drawCenterText("YOU LOST");
    }
};

Player.prototype.simpleHUD = function(live, level) {
    ctxHUD.clearRect(0, 0, 505, 150);

  	var imageLevel = new Image();
    var imageLive = new Image();
	
	imageLevel.src = "images/level.png";
    imageLive.src = "images/Heart.png";
    
	ctxHUD.drawImage(imageLevel, 1, 55, 165, 65);
    ctxHUD.drawImage(imageLive, 400, 55, 165, 65);

    ctxHUD.font = "50px Impact, Charcoal, sans-serif";
    ctxHUD.lineWidth = 3;
    ctxHUD.strokeStyle = "black";
    ctxHUD.fillStyle = "white";

    ctxHUD.fillText(live, 463 + player.textFix, 106);
    ctxHUD.strokeText(live, 463 + player.textFix, 106);
    ctxHUD.fillText(level, 125 + player.textFix, 106);
    ctxHUD.strokeText(level, 125 + player.textFix, 106);
};

// DrawText on center screen for 0,5s
Player.prototype.drawCenterText = function(string) {

    ctxHUD.font = "42px Impact, Charcoal, sans-serif";
    ctxHUD.textAlign = "center";
    ctxHUD.lineWidth = 3;
    ctxHUD.strokeText(string, 505 / 2, 303);
    ctxHUD.fillText(string, 505 / 2, 303);

    window.setTimeout(function() {
        ctxHUD.clearRect(150, 200, 505, 606);
    }, 500);
};

//Adding enemies depends on player level
Enemy.prototype.multiplyEn = function() {
    var numberOfEnemies = player.levelDifficult * 2;
    var multpileEnemies = ((Math.random() * 10) + 3);
    for (i = 0; i < multpileEnemies; i++) {
        if (allEnemies.length < numberOfEnemies) {
            allEnemies.push(new Enemy());
        }
    }
};

////////////////////////////
var allEnemies = [];
var player = new Player();
////////////////////////////

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
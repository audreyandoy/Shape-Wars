var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var player;
var enemy;
var laser;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var spacePressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 38) {
    upPressed = true;
  } else if (e.keyCode == 32) {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 32) {
    spacePressed = false;
  }
}

function moveInDirection(position, angle, distance) {
  var newX, newY;
  newX = position.x + (distance * Math.sin(degToRad(angle)));
  newY = position.y + (-distance * Math.cos(degToRad(angle)));
  return {x: newX, y: newY};
}

function degToRad(degrees) {
  var radians = (Math.PI/180) * degrees;
  return radians;
}

var Ship = function() {
  this.position = {
    x: 200,
    y: 150
  }
  this.rotation = 10;
  this.draw = function() {
    var x = this.position.x;
    var y = this.position.y;
    var r = this.rotation;
    ctx.translate(x, y);
    ctx.rotate(degToRad(r));
    ctx.beginPath();
    ctx.moveTo(0, -10); 
    ctx.lineTo(-5, 10);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.stroke(); 
    ctx.rotate(degToRad(-r));
    ctx.translate(-x, -y);
  };
  this.update = function() {
    if (leftPressed) {
      this.rotation -= 10;
    }
    if (rightPressed) {
      this.rotation += 10;
    }
    if (upPressed) {
      this.position = moveInDirection(this.position, this.rotation, 3);
    }
  };
};

var Enemy = function() {
    this.position = {
        x: 0,
        y: 0
    };

    this.size = 30;
    this.direction = Math.random() * 360;
    this.speed = 1;
    this.draw = function() {
        var x = this.position.x;
        var y = this.position.y;
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.rect(0,0,this.size,this.size);
        ctx.stroke();
        ctx.translate(-x,-y);
    }
}

var main = function() {
  window.requestAnimationFrame(main); // Creates a callback loop
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);  

  // Update and Draw each sprite
  player.update();
  player.draw();
  enemy.draw();
}

function startGame() {
  player = new Ship();
  enemy = new Enemy();
  main();
}

startGame();
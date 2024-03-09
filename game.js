const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount;
let gameRunning = false;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame() {
  if (!gameRunning) {
    showStartScreen();
    return;
  }

  changeSnakePosition();
  if (isGameOver()) {
    drawGameOver();
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function showStartScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '20px Verdana';
  ctx.fillText('Press Spacebar or Arrow Key to Start', canvas.width / 10, canvas.height / 2);
}

function isGameOver() {
  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    return true;
  }

  for (let part of snakeParts) {
    if (part.x === headX && part.y === headY) {
      return true;
    }
  }

  return false;
}

function drawGameOver() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '50px Verdana';
  ctx.fillText('Game Over', canvas.width / 6.5, canvas.height / 2);
  ctx.font = '20px Verdana';
  ctx.fillText('Score: ' + score, canvas.width / 2.5, canvas.height / 1.5);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  if (!gameRunning && (event.keyCode === 32 || (event.keyCode >= 37 && event.keyCode <= 40))) {
    gameRunning = true;
    xVelocity = 0; // Initialize movement direction - can adjust based on preference
    yVelocity = -1; // Starts moving upwards
    drawGame();
  } else if (gameRunning) {
    // Up
    if (event.keyCode === 38 && yVelocity === 0) {
      yVelocity = -1;
      xVelocity = 0;
    }
    // Down
    else if (event.keyCode === 40 && yVelocity === 0) {
      yVelocity = 1;
      xVelocity = 0;
    }
    // Left
    else if (event.keyCode === 37 && xVelocity === 0) {
      xVelocity = -1;
      yVelocity = 0;
    }
    // Right
    else if (event.keyCode === 39 && xVelocity === 0) {
      xVelocity = 1;
      yVelocity = 0;
    }
  }
}

// Call showStartScreen initially to display the start message
showStartScreen();

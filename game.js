const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

let gameRunning = false;

function drawGame() {
  if (!gameRunning) {
    drawStartScreen();
    return;
  }

  changeSnakePosition();
  if (isGameOver()) {
    drawGameOver();
    gameRunning = false;
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
    return true;
  }

  for (let part of snakeParts) {
    if (part.x === headX && part.y === headY) {
      return true;
    }
  }

  return false;
}

function drawStartScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '30px Verdana';
  ctx.fillText('Press Spacebar or Arrow Key to Start', canvas.width / 6, canvas.height / 2);
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
    xVelocity = yVelocity = 0; // Reset velocity to avoid instant game over
    yVelocity = -1; // Set initial direction upwards
    score = 0; // Reset score
    headX = headY = 10; // Reset snake position
    snakeParts.length = 0; // Clear snake parts
    tailLength = 2; // Reset initial tail length
    drawGame();
  } else if (gameRunning) {
    switch (event.keyCode) {
      case 38: // Up
        if (yVelocity === 0) {
          yVelocity = -1;
          xVelocity = 0;
        }
        break;
      case 40: // Down
        if (yVelocity === 0) {
          yVelocity = 1;
          xVelocity = 0;
        }
        break;
      case 37: // Left
        if (xVelocity === 0) {
          xVelocity = -1;
          yVelocity = 0;
        }
        break;
      case 39: // Right
        if (xVelocity === 0) {
          xVelocity = 1;
          yVelocity = 0;
        }
        break;
    }
  }
}

// Remaining functions like clearScreen, drawSnake, changeSnakePosition, drawApple, checkAppleCollision, drawScore remain the same...

drawGame();

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

function showStartScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '20px Verdana';
  ctx.fillText('Press Spacebar or Arrow Key to Start', 50, canvas.height / 2);
}

function drawGame() {
  if (!gameRunning) {
    return;
  }
  
  changeSnakePosition();

  if (isGameOver()) {
    gameRunning = false;
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

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'green';
  snakeParts.forEach(part => {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  });
  snakeParts.push({ x: headX, y: headY });
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = 'darkgreen'; // Snake head
  ctx.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc((appleX * tileSize) + tileSize / 2, (appleY * tileSize) + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Verdana';
  ctx.fillText("Score " + score, 10, 30);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  if (!gameRunning && (event.keyCode === 32 || (event.keyCode >= 37 && event.keyCode <= 40))) {
    gameRunning = true;
    xVelocity = 0; // Initialize to not move horizontally
    yVelocity = -1; // Initialize to move up
    drawGame();
  } else if (gameRunning) {
    switch(event.keyCode) {
      case 37: // Left
        if (xVelocity == 0) {
          xVelocity = -1; yVelocity = 0;
        }
        break;
      case 38: // Up
        if (yVelocity == 0) {
          xVelocity = 0; yVelocity = -1;
        }
        break;
      case 39: // Right
        if (xVelocity == 0) {
          xVelocity = 1; yVelocity = 0;
        }
        break;
      case 40: // Down
        if (yVelocity == 0) {
          xVelocity = 0; yVelocity = 1;
        }
        break;
    }
  }
}

showStartScreen();

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

function drawGame() {
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
  for (let part of snakeParts) {
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push({ x: headX, y: headY });
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  // Draw head
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
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
  // Up
  if (event.keyCode === 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  // Down
  else if (event.keyCode === 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  // Left
  else if (event.keyCode === 37) {
    if (xVelocity == 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }
  // Right
  else if (event.keyCode === 39) {
    if (xVelocity == -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}

drawGame();

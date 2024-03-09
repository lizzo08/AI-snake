const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2; 
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let touchX = 0;
let touchY = 0;

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
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
  if (xVelocity === 0 && yVelocity === 0) {
    return false;
  }

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

  ctx.fillStyle = 'orange';
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
  ctx.font = '10px Verdana';
  ctx.fillText('Score ' + score, canvas.width - 50, 10);
}

function touchStart(event) {
  touchX = event.changedTouches[0].screenX;
  touchY = event.changedTouches[0].screenY;
}

function touchMove(event) {
  event.preventDefault(); // Prevent scrolling when touching the canvas
  const deltaX = event.changedTouches[0].screenX - touchX;
  const deltaY = event.changedTouches[0].screenY - touchY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && xVelocity !== -1) {
      xVelocity = 1;
      yVelocity = 0;
    } else if (xVelocity !== 1) {
      xVelocity = -1;
      yVelocity = 0;
    }
  } else {
    if (deltaY > 0 && yVelocity !== -1) {
      yVelocity = 1;
      xVelocity = 0;
    } else if (yVelocity !== 1) {
      yVelocity = -1;
      xVelocity = 0;
    }
  }
}

document.addEventListener('keydown', keyDown);
canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchmove', touchMove, false);

function keyDown(event) {
  switch (event.keyCode) {
    case 37: // Left
      if (xVelocity == 1) return;
      xVelocity = -1;
      yVelocity = 0;
      break;
    case 38: // Up
      if (yVelocity == 1) return;
      yVelocity = -1;
      xVelocity = 0;
      break;
    case 39: // Right
      if (xVelocity == -1) return;
      xVelocity = 1;
      yVelocity = 0;
      break;
    case 40: // Down
      if (yVelocity == -1) return;
      yVelocity = 1;
      xVelocity = 0;
      break;
  }

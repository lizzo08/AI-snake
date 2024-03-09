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

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
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

function drawGameOver() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.font = '50px Verdana';
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  ctx.fillStyle = gradient;

  ctx.fillText('Game Over', canvas.width / 6, canvas.height / 2);
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

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// Other functions (drawApple, checkAppleCollision, drawScore, touchStart, touchMove, keyDown) remain the same...

document.body.addEventListener('keydown', keyDown);
canvas.addEventListener('touchstart', touchStart, { passive: false });
canvas.addEventListener('touchmove', touchMove, { passive: false });

function keyDown(event) {
  // Key controls (Up, Down, Left, Right) remain the same...
}

drawGame();

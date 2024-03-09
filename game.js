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
let yVelocity = -1; // Set initial movement direction upwards

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
  ctx.fillStyle = 'darkgreen';
  ctx.beginPath();
  ctx.arc((headX * tileSize) + tileSize / 2, (headY * tileSize) + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.beginPath();
    if (i === snakeParts.length - 1) { // Tail part should be a bit smaller
      ctx.arc((part.x * tileSize) + tileSize / 2, (part.y * tileSize) + tileSize / 2, tileSize / 2.5, 0, 2 * Math.PI);
    } else {
      ctx.arc((part.x * tileSize) + tileSize / 2, (part.y * tileSize) + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
    }
    ctx.fill();
  }

  snakeParts.push({ x: headX, y: headY }); // Add new part at the head position
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); // Remove the furthest part if we have more than the tail length
  }
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
  else if (event.keyCode === 37 && xVelocity

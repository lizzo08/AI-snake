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
  let gameOver = false;

  if (xVelocity === 0 && yVelocity === 0) {
    return false;
  }

  // Walls collision
  if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
    gameOver = true;
  }

  // Own body collision
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '50px Verdana';
    ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push({ x: headX, y: headY }); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) { 
    snakeParts.shift(); // remove the furthers item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
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

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  // Up
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  // Down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  // Left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    xVelocity = -1;
    yVelocity = 0;
  }

  // Right
  if (event.keyCode == 39) {
   If (event.keyCode == 39) {
    if (xVelocity == -1) return;
    xVelocity = 1;
    yVelocity = 0;
  }
}

drawGame();

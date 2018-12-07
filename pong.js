var canvas = document.getElementById('stage');
var ctx = canvas.getContext('2d');

var enemyx = canvas.width/4
var enemyy = 20

var playerx = canvas.width/4
var playery = canvas.height-20

var paddleWidth = 50
var paddleHeight = 10

var paddleSpeed = 15

function movePaddle() {
   if (event.key === 'a') {
       playerx -= paddleSpeed;
       if (playerx < 0) {
           playerx = 0
       }
   }
   else if (event.key === 'd') {
       playerx += paddleSpeed;
       if (playerx > canvas.width - paddleWidth) {
           playerx = canvas.width - paddleWidth
       }
   }
}
document.onkeyup = movePaddle;
requestAnimationFrame(animate);

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.beginPath();
   ctx.stroke();
 ctx.rect(enemyx, enemyy, paddleWidth, -paddleHeight)
   ctx.rect(playerx, playery, paddleWidth, paddleHeight)

   ctx.rect(0,0, canvas.width, canvas.height);
   ctx.stroke();

   ctx.beginPath()
   ctx.arc(ballx, bally, ballRadius, 0,  Math.PI*2);
   ctx.stroke();

   moveBall()
   moveEnemy()
   requestAnimationFrame(animate);
};

var ballx = canvas.width/2;
var bally = canvas.height/2;
var dx = 0.5;
var dy = 0.5;
ballRadius = 5;

var baseSpeed = 2
var dx = baseSpeed;
var dy = baseSpeed;
var speedVariance = 10;
var enemyPaddleSpeed = 2;

function moveEnemy () {
   centreOfEnemy = enemyx+paddleWidth/2;
   if (ballx > centreOfEnemy + enemyPaddleSpeed*2){
       enemyx += enemyPaddleSpeed;
       if (enemyx > canvas.width - paddleWidth) {
           enemyx = canvas.width - paddleWidth;
       }
   }
   else if (ballx < centreOfEnemy - enemyPaddleSpeed*2) {
       enemyx -= enemyPaddleSpeed;
       if (enemyx < 0) {
           enemyx = 0;
       }
   }
}


function bounceBall(px) {
   dy*=-1;

   distanceToCentre = ballx-(px+paddleWidth/2);
   newDx = distanceToCentre/speedVariance;

   dx = baseSpeed*newDx
}

var playerScore = 0;
var enemyScore = 0;

function resetBall() {
   ballx = canvas.width/2;
   bally = canvas.height/2;
   sleep();
}

function sleep() {
   var start = new Date().getTime();
   while (new Date().getTime() - start <= 3000) {

   }
   dx = baseSpeed;
   dy = baseSpeed;
}

function moveBall () {
   ballx += dx;
   bally += dy;

   if (ballx+ballRadius >= canvas.width || ballx-ballRadius <=0) {
       dx *=-1;
   }

   if (bally + ballRadius >= playery) {
       if (ballx + ballRadius > playerx && ballx - ballRadius  < playerx + paddleWidth) {
           bounceBall(playerx);
       }
       else {
           enemyScore += 1
           document.getElementById("enemyScore").innerHTML = "Enemy: " + enemyScore;
           resetBall()
       }
   } 
  
   if (bally - ballRadius <= enemyy) {
       if (ballx + ballRadius > enemyx && ballx - ballRadius  < enemyx + paddleWidth) {
           bounceBall(enemyx);
       }
       else {
           playerScore += 1
           document.getElementById("playerScore").innerHTML = "Player: " + playerScore;
           resetBall()
       }
   }
}








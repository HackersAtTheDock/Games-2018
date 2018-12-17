var canvas = document.getElementById('stage');
var ctx = canvas.getContext('2d');

var enemyx = canvas.width/4
var enemyy = 20

var playerx = canvas.width/4
var playery = canvas.height-20

var paddlewidth = 50
var paddleheight = 10

var paddlespeed = 10

var ballx = canvas.width/2;
var bally = canvas.height/2;
var dx= 5;
var dy= 5;
ballradius = 5;

var basespeed = 2
var dx = basespeed;
var dy = basespeed;
var speedvariance = 10;
var enemypaddlespeed = 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.stroke();
  ctx.rect(enemyx, enemyy, paddlewidth, -paddleheight);
  ctx.rect(playerx, playery, paddlewidth, paddleheight);
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
};

function movepaddle(event) {
  if (event.key === 'q') {
    playerx -= paddlespeed;
    if (playerx < 0) {
      playerx = 0
    }
  }
  else if (event.key === 'e') {
    playerx += paddlespeed;
    if (playerx > canvas.width - paddlewidth) {
      playerx = canvas.width - paddlewidth
    }
  }
}
document.onkeyup = movepaddle;
requestAnimationFrame(animate);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.stroke();

  ctx.rect(enemyx, enemyy, paddlewidth, -paddleheight)
  ctx.rect(playerx, playery, paddlewidth, paddleheight)

  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.stroke();

  ctx.beginPath()
  ctx.arc(ballx, bally, ballradius, 0, Math.PI*2);
  ctx.stroke();

  moveball()
  moveenemy()
  requestAnimationFrame(animate);
};




function moveball () {
  ballx += dx;
  bally += dy;

  if (ballx+ballradius >= canvas.width || ballx-ballradius <=0) {
    dx *=-1
  }

  if (bally + ballradius >= playery) {
    if (ballx + ballradius > playerx && ballx - ballradius < playerx + paddlewidth) {
      dy *=-1
    }
    else {
      console.log('You passed the sentence challenge. ┼ΘTσ├║ΘσT├ÆVeô§╚-♦♦î')
      dx = 0;
      dy = 0;
    }
  }
  if (bally - ballradius <= enemyy) {
    if (ballx + ballradius > enemyx && ballx - ballradius < enemyx + paddlewidth) {
      dy *=-1;
    }
    else {
      console.log('You passed the sentence challenge.')
      dx = 0;
      dy = 0;
    }
  }
}
function moveenemy () {
  centreofenemy = enemyx+paddlewidth/2;
  if (ballx > centreofenemy + paddlespeed*2){
    enemyx += paddlespeed;
    if (enemyx > canvas.width - paddlewidth) {
      enemyx = canvas.width - paddlewidth;
    }
  }
  else if (ballx < centreofenemy - paddlespeed*2) {
    enemyx -= paddlespeed;
    if (enemyx < 0) {
      enemyx = 0;
    }
  }
}

function bounceball(px) {
  dy*=-1;

  distancetocentre = ballx-(px+paddlewidth/2);
  newdx = distancetocentre/speedvariance;

  dx = basespeed*newdx
}
function moveball () {
  ballx += dx;
  bally += dy;

  if (ballx+ballradius >= canvas.width || ballx-ballradius <=0) {
    dx *=-1;
  }

  if (bally + ballradius >= playery) {
    if (ballx + ballradius > playerx && ballx - ballradius < playerx + paddlewidth){
      bounceball (playerx);
    }
    else {
      console.log('☻ I WIN I WIN I WIN I WINNNNNNNNNNNNNNNNNNNNNN!!!!!!!!!!!!!!!!!')
      dx =0;
      dy =0;
    }
  }

  if (bally - ballradius <= enemyy) {
    if (ballx + ballradius > enemyx && ballx - ballradius < enemyx + paddlewidth) {
      bounceball(enemyx);

    }
    else {
      console.log ('Ugh. You win. ••••• You get a flight on flight Jet2, 2, 2, 2, 2, 2, 2, 2, 2, to Leeds Bradford.')
      dx = 0;
      dy = 0;

    }
  }
}

//Part 6
var playerscore = 0;
var enemyscore = 0;

function resetball() {
ballx = canvas.width/2;
bally = canvas.height/2;
playerx = canvas.width/4;
enemyx = canvas.width/4;
sleep();
}

function sleep() {
  var start = new Date().getTime();
  while (new Date().getTime() - start <= 3000) {

  }
  dx = basespeed;
  dy = basespeed;
}

function moveball () {
  ballx += dx;
  bally += dy;

  if (ballx+ballradius >= canvas.width || ballx-ballradius <=0) {
    dx*=-1;
  }

  if (bally + ballradius >= playery) {
    if (ballx + ballradius > playerx && ballx - ballradius < playerx + paddlewidth) {
      bounceball(playerx);
    }
    else {
      enemyscore += 1
      document.getElementById("enemyscore").innerHTML = "Tarquinfintinlimbimlimbimbimbimbusstopftangftangolébiscuitbarrel: " + enemyscore;
      resetball()
    }
  }

  if (bally - ballradius <= enemyy) {
    if (ballx + ballradius > enemyx && ballx - ballradius < enemyx + paddlewidth) {
      bounceball(enemyx);
    }

    else {
      playerscore += 1
      document.getElementById("playerscore").innerHTML = "Pneumonoultramicroscopicsilicovolcanoconiosis: " + playerscore;
      resetball();
    }
  }
}

var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var paddle1Y = 250;
var paddle2Y = 250;

var playerOneScore = 0;
var playerTwoScore = 0;

const PADDLEHEIGHT = 100;
const PADDLETHICKNESS = 10;

function calculateMousePos (evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
			x:mouseX,
			y:mouseY
	};
}

window.onload = function() {
	console.log("Chicken");
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	var fps = 60;
		setInterval(function() {
			drawEverything();
			moveEverything();
		}, 1000/fps);

		canvas.addEventListener('mousemove',
			function (evt) {
				var mousePos = calculateMousePos(evt);
				paddle1Y = mousePos.y - (PADDLEHEIGHT/2);
			});
}

function computerMovement() {
	
	var paddle2YCenter = paddle2Y + (PADDLEHEIGHT/2);
	if(paddle2YCenter < ballY) {
		paddle2Y += 6;
	} else {
			paddle2Y -= 6;
		}
    }

    function ballReset() {
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballSpeedX = -3;
    } 

    function moveEverything () {
    computerMovement();
    
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    
    if (ballX < 40) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLEHEIGHT) {
            ballSpeedX = -ballSpeedX;
    
            var deltaY = ballY
            -(paddle2Y+PADDLEHEIGHT/2);
            ballSpeedY = deltaY * 0.25;
    
        }
    
        else {
            ballReset();
            playerTwoScore++;
            } 
        }
    
    
    if (ballX > 860) {
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLEHEIGHT) {
            ballSpeedX = -ballSpeedX;
            }
    
        else {
            ballReset();
    
            playerOneScore++;
            } 
        }
    
    if (ballY < 20) {
        ballSpeedY = -ballSpeedY;
        }
    
    if (ballY > 480) {
        ballSpeedY = -ballSpeedY;
        }
    
    
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}


function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
} 
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

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
const WINNING_SCORE = 7;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

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
				paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
			});
}

function computerMovement() {
	
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY + 35){
			paddle2Y -= 6;
		}
    }

function ballReset(player) {
    if (playerOneScore >= WINNING_SCORE || 
        playerTwoScore >= WINNING_SCORE) {
            playerOneScore = 0;
            playerTwoScore = 0;
        }
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedY = 0;

    if (player === PLAYER_ONE) {
        ballSpeedX = 10;
    }
    else {
        ballspeedX = -10;
    }
} 

function moveEverything () {
    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 40) {
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
        ballSpeedY = deltaY * 0.35;
        }
        else {
            ballReset(PLAYER_TWO); //Must be BEFORE ballReset();
            playerTwoScore++;
        } 
    }
    if (ballX > 860) {
    if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;
        }
    else {
        ballReset();
        playerOneScore++; //Must be BEFORE ballReset();
        } 
    }

    if (ballY < 20) {
    ballSpeedY = -ballSpeedY;
    }

    if (ballY > 480) {
    ballSpeedY = -ballSpeedY;
    }


}
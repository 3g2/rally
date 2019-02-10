const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 10;

var canvas;
var canvasContext;

var paddle1Y = 250;
var paddle2Y = 250;

var playerOneScore = 0;
var playerTwoScore = 0;
const WINNING_SCORE = 2;

var showingWinScreen = false;
let gameStarted = false;

const PADDLE_HEIGHT = 85;
const PADDLE_THICKNESS = 10;

var numHits = 0;
var prevNumHits = numHits;
const BALLSPEED_INCREASE = 1.01;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font='30px Share Tech Mono, monospace';
    canvasContext.fillText("Move mouse to start", 600, 300);
    canvasContext.font='50px Share Tech Mono, monospace';
    canvasContext.fillText("Rally", 600, 150);

    canvas.addEventListener('mousemove', function() {
        if (gameStarted === false) {
            gameStarted = true;
            var fps = 60;
            setInterval(function () {
                drawEverything();
                moveEverything();
            }, 1000 / fps);
        }
    });
    
    canvas.addEventListener('mousedown', endGameMouseClick);
    canvas.addEventListener('mousemove',
        function (evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
}

function ballReset(player) {
    if (playerOneScore >= WINNING_SCORE || 
        playerTwoScore >= WINNING_SCORE) {
            showingWinScreen = true;
    }

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedY = 0;

    if (player === PLAYER_ONE) {
        ballSpeedX = 10;
    }
    else {
        ballspeedX = -10;
    }
}

function moveEverything() {
    computerMovement();

    if (showingWinScreen) {
        return;
    }

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    //X-AXIS Borders
    if (ballX < 20) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
            numHits += 1;
            if (numHits > prevNumHits) {
                ballSpeedX = ballSpeedX;
                ballSpeedY = ballSpeedY;
                prevNumHits = numHits;
            }
        }
        else if (ballX < -20) {
            playerTwoScore++;
            ballReset();
            numHits = 0;
            prevNumHits = 0;
        }
    }
    if (ballX > 1180) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            numHits += 1;
            if (numHits > prevNumHits) {
                ballSpeedX = ballSpeedX * BALLSPEED_INCREASE;
                ballSpeedY = ballSpeedY * BALLSPEED_INCREASE;
                prevNumHits = numHits;
            }
        }
        else if (ballX > 1250) {
            playerOneScore++;
            ballReset();
            numHits = 0;
            prevNumHits = 0;
        }
    }

    //Y-AXIS Borders 
    if (ballY < 40) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballY > 460) {
        ballSpeedY = -ballSpeedY;
    }


}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 10;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 10;
    }
}

function endGameMouseClick(evt) {
    if (showingWinScreen) {
        playerOneScore = 0;
        playerTwoScore = 0;
        showingWinScreen = false;
    }
}
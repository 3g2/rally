
var canvas;
var canvasContext;
var showingWinScreen = false;
let gameStarted = false;
let isPaused = false;

const PLAYER_ONE = 1;
const PLAYER_TWO = 2;
const WINNING_SCORE = 1;
var playerOneScore = 0;
var playerTwoScore = 0;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 8;
var ballSpeedY = 8;
var ballServeSpeed = 8;
const BALLSPEED_INCREASE = 1.04;

var numHits = 0;
var prevNumHits = numHits;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 85;
const PADDLE_THICKNESS = 10;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    gameStartTitle();
    canvas.addEventListener('click', function() {
        if (gameStarted === false) {
            gameStarted = true;
            var fps = 60;
            setInterval(function () {
                if (!isPaused) {
                    drawEverything();
                    moveEverything();
                }
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
    ballSpeedY = 3;
    numHits = 0;
    prevNumHits = 0;

    if (player === PLAYER_ONE) {
        ballSpeedX = ballServeSpeed;
    }
    else {
        ballSpeedX = -ballServeSpeed;
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
            numHits++;
            makePaddleNoise();

            if (numHits > 0) {
                ballSpeedX = ballSpeedX * BALLSPEED_INCREASE;
                ballSpeedY = ballSpeedY * BALLSPEED_INCREASE;
            }
        } else if (ballX < -20) {
            playerTwoScore++;
            numHits = 0;
            ballReset(PLAYER_TWO);
            makeMissBallNoise();
            }
        }
    if (ballX > 1180) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            numHits++;

            makePaddleNoise();

                if (numHits > 0) {
                    ballSpeedX = ballSpeedX * BALLSPEED_INCREASE;
                    ballSpeedY = ballSpeedY * BALLSPEED_INCREASE;
                }
        }
        else if (ballX > 1250) {
            playerOneScore++;
            numHits = 0;
            ballReset(PLAYER_ONE);

            makeMissBallNoise();
        }
    }
    //Y-AXIS Borders
    if (ballY < 15) {
        ballSpeedY = -ballSpeedY;
        makeWallHitNoise();
    }
    if (ballY > 485) {
        ballSpeedY = -ballSpeedY;
        makeWallHitNoise();
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
        paddle2Y += 8;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 8;
    }
}

function endGameMouseClick(evt) {
    if (showingWinScreen) {
        playerOneScore = 0;
        playerTwoScore = 0;
        showingWinScreen = false;
    }
}

function gameStartTitle() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font='30px Bungee Outline, cursive';
    canvasContext.fillText("Click to start", 600, 400);
    canvasContext.font='80px Bungee Outline, cursive';
    canvasContext.fillText("Rally", 600, 150);
}

function makePaddleNoise() {
    var paddleHitSound = document.getElementById('paddleHit');
    var paddleHitSoundStatus = true;

    if (paddleHitSoundStatus) {
        paddleHitSound.pause;
        paddleHitSound.currentTime = 0;
        paddleHitSound.play();
        paddleHitSound.false;
    }
}

function makeMissBallNoise() {
    var missBallSound = document.getElementById('missBall');
    var missBallSoundStatus = true;

    if (missBallSoundStatus)
    {
        missBallSound.pause;
        missBallSound.currentTime = 0;
        missBallSound.play();
        missBallSound.false;
    }
}

function makeWallHitNoise() {
    var wallHitSound = document.getElementById('wallHit');
        var wallHitStatus = true;

        if (wallHitStatus) {
            wallHitSound.pause;
            wallHitSound.currentTime = 0;
            wallHitSound.play();
            wallHitSound.false;
        }
}

window.addEventListener("keydown", gamePause); 

//OR isPaused = !isPaused
function gamePause(evt) {
    if (evt.keyCode === 80) {
        if (!isPaused) {
            isPaused = true;
        }
        else {
            isPaused = false;
        }
    }
}
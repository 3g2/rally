
var canvas;
var canvasContext;
var showingWinScreen = false;
let gameStarted = false;
let isPaused = false;
let gameInterval;

const PLAYER_ONE = 1;
const PLAYER_TWO = 2;
const WINNING_SCORE = 5;
var playerOneScore = 0;
var playerTwoScore = 0;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 8;
var ballSpeedY = 8;
var originalBallSpeedY = 8;
var ballServeSpeed = 8;
const BALLSPEED_INCREASE = 1.04;

var numHits = 0;
var prevNumHits = numHits;
var savedRally = localStorage.getItem("highScore") || 0;

//paddle1&2Y are variables that is a starting point for where the paddles will be
var paddle1Y = 250;
var paddle1YCenter;
var paddle2Y = 250;
const PADDLE_HEIGHT = 90;
const PADDLE_THICKNESS = 10;

window.onload = loadGame;

function loadGame() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    playerOneScore = 0;
    playerTwoScore = 0;
    gameStartTitle();
    canvas.addEventListener('click', function() {
        if (gameStarted === false) {
            gameStarted = true;
            var fps = 60;
            gameInterval = setInterval(
                function() {
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
            paddle1YCenter = paddle1Y;
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
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballX < 20) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            if (ballY < paddle1YCenter - 26 && ballY > paddle1YCenter - 45) {
                ballspeedY = (ballSpeedY * 2);
                console.log(ballSpeedY);

            }
            else if (ballY < paddle1YCenter -  6 && ballY > paddle1YCenter - 25){
                ballspeedY = (ballSpeedY * 2);
                console.log(ballSpeedY);
            }
            else if (ballY > paddle1YCenter - 5 && ballY < paddle1YCenter + 5){
                paddleYCenter;
                console.log(ballSpeedY);
            }
            else if (ballY > paddle1YCenter + 6 && ballY < paddle1YCenter + 25){
                ballspeedY = (ballSpeedY * 2);
                console.log(ballSpeedY);
            }
            else if (ballY > paddle1YCenter + 26 && ballY < paddle1YCenter + 45){
                ballspeedY = (ballSpeedY * 2);
                console.log(ballSpeedY);
            }
            ballSpeedX = -ballSpeedX;
            numHits++;
            makePaddleNoise();

            if (numHits > 0) {
                ballSpeedX = ballSpeedX * BALLSPEED_INCREASE;
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
            if (ballY < paddle2Y + 17) {
                if (ballSpeedY === 1 || ballSpeedY === -1) {
                    originalBallSpeedY;
                } else {
                    ballSpeedY * 50;
                }
                console.log("top45"+ ballSpeedY);
            }
            if (ballY > paddle2Y + 18 && ballY < paddle2Y + 34){
                if (ballSpeedY === 1 || ballSpeedY === -1) {
                    originalBallSpeedY;
                } else {
                    ballSpeedY * 30;
                }
                console.log("top30"+ ballSpeedY);
            }
            if (ballY > paddle2Y + 35 && ballY < paddle2Y + 51){
                ballSpeedY = 1;
                console.log("0");
            }
            if (ballY > paddle2Y + 52 && ballY < paddle2Y + 68){
                if (ballSpeedY === 1 || ballSpeedY === -1) {
                    originalBallSpeedY;
                } else {
                    ballSpeedY * 30;
                console.log("bottom30"+ ballSpeedY);
                }
            }
            if (ballY > paddle2Y + 69 && ballY < paddle2Y + 85){
                if (ballSpeedY === 1 || ballSpeedY === -1) {
                    originalBallSpeedY;
                } else {
                    ballSpeedY * 50;
                console.log("bottom45"+ ballSpeedY);
                }
            }
            ballSpeedX = -ballSpeedX;
            numHits++;

            makePaddleNoise();

                if (numHits > 0) {
                    ballSpeedX = ballSpeedX * BALLSPEED_INCREASE;
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
        paddle2Y += 20;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 20;
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
    canvasContext.fillText("Click to start", 600, 300);
    canvasContext.font='100px Bungee Outline, cursive';
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

function gamePauseDisplay() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font='115px Bungee Outline, cursive';
    canvasContext.fillText("Paused", 600, 100);
}

//OR isPaused = !isPaused
function gamePause(evt) {
    if (evt.keyCode === 80) {
        const mainMenuButton = document.getElementById('mainMenu');
        mainMenuButton.addEventListener('click', function(){
            gameStarted = false;
            isPaused = false;
            clearInterval(gameInterval);
            mainMenuButton.style.visibility = 'hidden';
            ballReset();
            loadGame();
        })

        if (!isPaused) {
            isPaused = true;
            gamePauseDisplay();
            mainMenuButton.style.visibility = 'visible';
        }
        else {
            isPaused = false;
            mainMenuButton.style.visibility = 'hidden';
        }
    }
}
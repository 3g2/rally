function drawEverything () {

    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if(showingWinScreen){
        drawWinScreenText();
        if(playerOneScore >= WINNING_SCORE) {
            winningTitle();
            canvasContext.fillText("Player one wins!", 600, 150);
        } else if(playerTwoScore >= WINNING_SCORE) {
            winningTitle();
            canvasContext.fillText("Player two wins!", 600, 150);
        }
        canvasContext.font='30px Bungee Outline, cursive';
        canvasContext.fillText("Game Over. Click to Restart.", 600, 400);
    return;
    }
    
    drawNet();
    rally();
    drawPaddle();
    highRally();
    drawBall();
    drawScoreBoard();

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

function drawNet() {
    for (i = 0; i < canvas.height; i += 1) {
        colorRect(canvas.width/2-1,i,5,20,'white');
    }
}

function drawWinScreenText() {
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font='30px Bungee Outline, cursive';
}

function drawBall(){
    colorCircle(ballX, ballY, 10, 'white'); 
}

function drawPaddle() {
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
}

function drawScoreBoard() {
    canvasContext.font='70px Bungee Outline, cursive';
    canvasContext.fillText(playerOneScore, 300, 100);
    canvasContext.fillText(playerTwoScore, canvas.width-300, 100);
}

function rally() {
    if (numHits >= 0) {
        canvasContext.font='40px Bungee Outline, cursive';
        canvasContext.fillText("Rally:" + numHits, 400, 450);
    }
}

function winningTitle() {
    canvasContext.font='60px Bungee Outline, cursive';
}

function highRally () {
    canvasContext.font='20px Bungee Outline, cursive';
    canvasContext.fillText("High Score:" + savedRally, 400, 420);
    if (numHits > savedRally) {
        localStorage.setItem("highScore", numHits);
        savedRally++;

    }
}
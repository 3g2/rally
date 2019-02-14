function drawEverything () {

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if(showingWinScreen){
        canvasContext.fillStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.font='30px Share Tech Mono, monospace';
        if(playerOneScore >= WINNING_SCORE) {
            canvasContext.fillText("Player one wins!", 600, 150);
        } else if(playerTwoScore >= WINNING_SCORE) {
            canvasContext.fillText("Player two wins!", 600, 150);

        }
        canvasContext.fillText("Game Over. Click to Restart.", 600, 400);
    return;
    }
 
    drawNet();
    
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	colorCircle(ballX, ballY, 10, 'white'); 

    canvasContext.font='50px Share Tech Mono, monospace';
	canvasContext.fillText(playerOneScore, 200, 100);
	canvasContext.fillText(playerTwoScore, canvas.width-200, 100);

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
    for (i = 0; i < canvas.height; i += 35) {
        colorRect(canvas.width/2-1,i,2,20,'white');
    }

}

function font (text) {
    canvasContext.fillStyle = 'white';
    canvasContext.textAlign = 'center';
    canvasContext.textBaseline = 'middle';
    canvasContext.font='30px Share Tech Mono, monospace';
}
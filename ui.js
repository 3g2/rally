function drawEverything () {

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    
    if(showingWinScreen){
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Game Over. Click to Continue.", 450, 150);

        if (playerOneScore >= WINNING_SCORE) {
            canvasContext.fillText("Player one has won!")
        }
        else if (playerTwoScore >= WINNING_SCORE) {
            canvasContext.fillText("Player two has won!", 450, 100)
        }

    return;
    }

    drawNet();
    
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	colorCircle(ballX, ballY, 15, 'blue'); 

	canvasContext.fillText(playerOneScore, 100, 100);
	canvasContext.fillText(playerTwoScore, canvas.width-100, 100);

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
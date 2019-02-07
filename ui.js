function drawEverything () {

	colorRect(0, 0, canvas.width, canvas.height, 'black');
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
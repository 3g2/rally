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

function computerMovement() {
	
	var paddle2YCenter = paddle2Y + (PADDLEHEIGHT/2);
	if(paddle2YCenter < ballY) {
		paddle2Y += 6;
	} else {
			paddle2Y -= 6;
		}
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
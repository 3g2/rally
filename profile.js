function drawEverything() {
   colorRect(0, 0, canvas.width, canvas.height, "blue");
   if (showingWinScreen) {
      drawWinScreenText();
      if (playerOneScore >= WINNING_SCORE) {
         winningTitle();
         canvasContext.fillText("Player one wins!", 700, 150);
      } else if (playerTwoScore >= WINNING_SCORE) {
         winningTitle();
         canvasContext.fillText("Player two wins!", 700, 150);
      }
      canvasContext.font = "30px Bungee Outline, cursive";
      canvasContext.fillText("Game Over. Click to Restart.", 700, 400);
      return;
   }

   drawNet();
   rally();
   drawPaddle();
   drawBall();
   drawScoreBoard();
}

function colorCircle(centerX, centerY, radius, drawColor) {
   canvasContext.fillStyle = 'rgba(255, 255, 255, .05)';
   canvasContext.beginPath();
   canvasContext.fillStyle = drawColor;
   canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
   canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
   canvasContext.fillStyle = drawColor;
   canvasContext.fillRect(leftX, topY, width, height);
}

function drawNet() {
   for (i = 0; i < canvas.height; i += 1) {
      colorRect(canvas.width / 2 - 1, i, 5, 20, "white");
   }
}

function drawWinScreenText() {
   canvasContext.fillStyle = "white";
   canvasContext.textAlign = "center";
   canvasContext.textBaseline = "middle";
   canvasContext.font = "30px Bungee Outline, cursive";
}

function drawBall() {
   colorCircle(ballX, ballY, 7, "white");
}

function drawPaddle() {
   colorRect(paddlePadding, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
   colorRect(
      canvas.width - paddlePadding,
      paddle2Y,
      PADDLE_THICKNESS,
      PADDLE_HEIGHT,
      "white"
   );
}

function drawScoreBoard() {
   canvasContext.font = "70px Bungee Outline, cursive";
   canvasContext.fillText(playerOneScore, 300, 100);
   canvasContext.fillText(playerTwoScore, canvas.width - 300, 100);
}

function rally() {
   var currentScore = document.getElementById("currentScore");
   if (numHits >= 0) {
      currentScore.style = "font: 40px Bungee Outline, cursive; color: white";
      currentScore.innerHTML = "Current Rally: " + numHits;
   }
}

function winningTitle() {
   canvasContext.font = "60px Bungee Outline, cursive";
}

function highRally() {
   var score = document.getElementById("score");
   score.style = "font: 40px Bungee Outline, cursive; color: white";
   score.innerHTML = "Rally Record: " + savedRally;
   if (numHits > savedRally) {
      localStorage.setItem("highScore", numHits);
      savedRally++;
   }
}

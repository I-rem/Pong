const gameContainer = document.getElementById('game-container');
const leftPaddle = document.getElementById('left-paddle');
const rightPaddle = document.getElementById('right-paddle');
const ball = document.getElementById('ball');

let ballX = 300;
let ballY = 200;
let ballSpeedX = 4;
let ballSpeedY = 4;

let playerScore = 0;
let aiScore = 0;

let leftPaddleY = 160;
let rightPaddleY = 160;
let targetLeftPaddleY = 160;
const paddleSpeed = 10;
const aiPaddleSpeed = 10;
const interpolationFactor = 0.2;

function movePaddles() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w' && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        }
        if (event.key === 's' && leftPaddleY < 340) {
            leftPaddleY += paddleSpeed;
        }
    });
}

function moveAI() {
    setInterval(() => {
        // Calculate the center of the AI paddle
        let aiPaddleCenter = rightPaddleY + 30;

        // Adjust AI paddle position based on the ball's position
        
        if (aiPaddleCenter < ballY - 15 && rightPaddleY < 340) {
            rightPaddleY += aiPaddleSpeed;
        } else if (aiPaddleCenter > ballY + 15 && rightPaddleY > 0) {
            rightPaddleY -= aiPaddleSpeed;
        }
    }, 1000 / 60);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 390) {
        ballSpeedY *= -1;
    }

    if (ballX <= 0) {
        ballX = 300;
        ballY = 200;
        ballSpeedX *= -1;
        aiScore++; // Increment AI score when ball passes left boundary
        document.getElementById('ai-score').textContent = aiScore; // Update AI score on the scoreboard
    }
    if (ballX >= 580) {
        ballX = 300;
        ballY = 200;
        ballSpeedX *= -1;
        playerScore++; // Increment player score when ball passes right boundary
        document.getElementById('player-score').textContent = playerScore; // Update player score on the scoreboard
    }

    if (ballX <= 20 && ballY >= leftPaddleY && ballY <= leftPaddleY + 60) {
        ballSpeedX *= -1;
    }
    if (ballX >= 560 && ballY >= rightPaddleY && ballY <= rightPaddleY + 60) {
        ballSpeedX *= -1;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}


function movePaddlesRender() {
    leftPaddle.style.top = leftPaddleY + 'px';
    rightPaddle.style.top = rightPaddleY + 'px';
}

function gameLoop() {
    moveBall();
    movePaddlesRender();
    requestAnimationFrame(gameLoop);
}

movePaddles();
moveAI();
gameLoop();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas width to 100% of the window width and fixed height
canvas.width = window.innerWidth - 200; // Adjust for controls
canvas.height = 400;

// Game variables
let snake = [{ x: Math.floor(canvas.width / 20 / 2), y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;
let gameStarted = false; // To track if the game has started
let foodPop = false;  // Track whether the pop animation is active

// Snake movement speed (controls how fast the snake moves)
const snakeSpeed = 100;
const blockSize = 20;  // Each block of the snake will be 20x20

// Function to draw the snake on the canvas
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'lime' : 'green';  // Head is lime, body is green
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });
}

// Function to draw the food on the canvas with animation
function drawFood() {
    if (foodPop) {
        ctx.save();  // Save the current state
        ctx.translate(food.x * blockSize + blockSize / 2, food.y * blockSize + blockSize / 2);
        ctx.scale(1.5, 1.5);  // Scale the food to make it pop
        ctx.translate(-(food.x * blockSize + blockSize / 2), -(food.y * blockSize + blockSize / 2));
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

    if (foodPop) {
        ctx.restore();  // Restore the state after the pop effect
        foodPop = false;  // Reset the pop flag
    }
}

// Function to update the snake's position based on the direction
function updateSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        foodPop = true;  // Activate the pop effect
        spawnFood();
    } else {
        snake.pop();
    }
}

// Function to spawn the food in a random position
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / blockSize)),
        y: Math.floor(Math.random() * (canvas.height / blockSize)),
    };
}

// Function to check if the snake collides with itself or the walls
function checkCollisions() {
    const head = snake[0];

    // Collision with walls
    if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
        return true;
    }

    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Function to handle key presses and change direction
function handleKeyPress(event) {
    if (!gameStarted) {
        return;  // Don't allow control before starting
    }

    // Prevent scrolling when arrow keys are pressed
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }

    event.preventDefault();  // Prevent default behavior (scrolling) when arrow keys are pressed
}

// Function to update the game state
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    if (checkCollisions()) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is: ${score}`);
        gameStarted = false;
        document.getElementById("startButton").style.display = 'block';  // Show the play button again
        return;
    }
    drawSnake();
    drawFood();
    document.getElementById('score').textContent = score;  // Update the score display
}

// Function to draw the start screen
function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2);
}

// Function to start the game when the button is clicked
function startGame() {
    gameStarted = true;
    score = 0;  // Reset score
    document.getElementById('score').textContent = score;  // Update score
    snake = [{ x: Math.floor(canvas.width / 20 / 2), y: 10 }];  // Reset snake
    direction = 'RIGHT';  // Reset direction
    document.getElementById("startButton").style.display = 'none';  // Hide the play button
    gameInterval = setInterval(gameLoop, snakeSpeed);
}

// Initialize the game
document.addEventListener('keydown', handleKeyPress);
document.getElementById('startButton').addEventListener('click', startGame);

// Draw the start screen initially
drawStartScreen();

// Resize canvas when the window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - 200;  // Adjust for controls
});

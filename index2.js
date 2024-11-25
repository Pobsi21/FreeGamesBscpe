// Listen for clicks on the "Try Now" button to start a game
document.getElementById("try-now").addEventListener("click", () => {
  // Hide the main menu and display the game container
  document.querySelector(".options").style.display = "none"; // Hide game options
  document.querySelector("#game-container").style.display = "block"; // Show game container
});

// Listen for clicks on the game names to load specific games
const gameListItems = document.querySelectorAll(".game-list li");
gameListItems.forEach(item => {
  item.addEventListener("click", (event) => {
    const gameName = event.target.innerText; // Get the name of the clicked game
    loadGame(gameName);
  });
});

// Function to dynamically load the selected game
function loadGame(gameName) {
  const gameDisplay = document.getElementById("game-display");

  // Clear any existing content in the game display section
  gameDisplay.innerHTML = "";

  // Load the specific game based on the clicked name
  switch (gameName) {
    case "Snake Eater":
      loadSnakeEaterGame();
      break;
    case "Tic Tac Toe":
      loadTicTacToeGame();
      break;
    case "Galaxy Shooting":
      loadGalaxyShootingGame();
      break;
    case "Type Speed":
      loadTypeSpeedGame();
      break;
    case "Fly Bird":
      loadFlyBirdGame();
      break;
    default:
      gameDisplay.innerHTML = "<p>Game not found!</p>";
  }
}

// Function to dynamically load the Snake Eater game
function loadSnakeEaterGame() {
  const gameDisplay = document.getElementById("game-display");

  // Create a canvas for the game
  const canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  gameDisplay.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = 800;  // Set canvas width
  canvas.height = 600; // Set canvas height

  // Implement the Snake Eater game logic (or load from an external script)
  const snake = [{ x: Math.floor(canvas.width / 20 / 2), y: 10 }];
  let direction = 'RIGHT';
  let food = { x: 15, y: 15 };
  let score = 0;
  let gameInterval;

  // Start the game loop when 'Play' button is clicked
  document.getElementById('startButton').addEventListener('click', () => {
    gameInterval = setInterval(gameLoop, 100); // Start the game loop
  });

  // Function to run the game logic on each frame
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    if (checkCollisions()) {
      clearInterval(gameInterval);  // Stop the game on collision
      alert('Game Over!');
    }
    drawSnake();
  }

  // Helper functions for the Snake Eater game (drawSnake, updateSnake, checkCollisions)
  // ... (game code logic)
}

// Function to load the Tic Tac Toe game
function loadTicTacToeGame() {
  const gameDisplay = document.getElementById("game-display");

  // Add the Tic Tac Toe game elements
  gameDisplay.innerHTML = `
    <div id="ticTacToeGame">
      <h2>Tic Tac Toe</h2>
      <div id="gameBoard" class="board">
        <div class="row">
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
        </div>
        <div class="row">
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
        </div>
        <div class="row">
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
        </div>
      </div>
      <button id="restartButton">Restart</button>
      <div id="gameStatus"></div>
    </div>
  `;

  // Tic-Tac-Toe Game Logic
  const cells = document.querySelectorAll('[data-cell]');
  const gameStatus = document.getElementById('gameStatus');
  const restartButton = document.getElementById('restartButton');

  let currentPlayer = 'X';
  let gameActive = true;
  let boardState = ['', '', '', '', '', '', '', '', '']; // Keeps track of board cells

  // Event listener for cell clicks
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
  });

  // Handle the cell click
  function handleCellClick(index) {
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      gameStatus.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
    } else if (boardState.every(cell => cell !== '')) {
      gameStatus.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // Check if the current player wins
  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
  }

  // Restart the game
  restartButton.addEventListener('click', restartGame);

  function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
  }
}

// Add similar functions for the other games: Galaxy Shooting, Type Speed, Fly Bird, etc.


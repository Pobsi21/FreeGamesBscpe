    // JavaScript Code

    const leftLine = document.querySelector('.line.left');
    const rightLine = document.querySelector('.line.right');
    const buttons = document.querySelectorAll('.option');
    const container = document.querySelector('.container');
    const settingsButton = document.getElementById("settings-button");
    const exitButton = document.getElementById("exit-button");
    const settingsMenu = document.getElementById("settings-menu");
    const mainTitle = document.querySelector(".main-title");
    const optionsDiv = document.querySelector(".options");
    const aboutButton = document.getElementById("about-button");
    const aboutMenu = document.getElementById("about-menu");
    const exitAboutButton = document.getElementById("exit-about-button");
    const developerButton = document.getElementById("developer-button");
    const developerMenu = document.getElementById("developer-menu");
    const exitDeveloperButton = document.getElementById("exit-developer-button");
    const tryNowButton = document.getElementById("try-now"); 
    const tryNowMenu = document.getElementById("trynow-menu");
    const exitTryNowButton = document.getElementById("exit-trynow-button");

    // Function to reset styles to normal
    function resetStyles() {
      mainTitle.classList.remove('move-up');
      optionsDiv.classList.remove('move-up');
      leftLine.classList.remove('move-up');
      rightLine.classList.remove('move-up');
      settingsMenu.classList.remove('active');
      aboutMenu.classList.remove('active');
      developerMenu.classList.remove('active');
      tryNowMenu.classList.remove('active');

      // Show all buttons again
      buttons.forEach(button => {
        button.style.display = "inline-block";
        button.classList.remove('large');
      });
    }

    // Event listeners for buttons and game selection

    settingsButton.addEventListener('click', () => {
      mainTitle.classList.add('move-up');
      optionsDiv.classList.add('move-up');
      leftLine.classList.add('move-up');
      rightLine.classList.add('move-up');
      settingsMenu.classList.add('active');
      settingsButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== settingsButton) {
          button.style.display = "none";
        }
      });
    });

    exitButton.addEventListener('click', resetStyles);
    aboutButton.addEventListener('click', () => {
      resetStyles();
      aboutMenu.classList.add('active');
      aboutButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== aboutButton) {
          button.style.display = "none";
        }
      });
    });

    exitAboutButton.addEventListener('click', resetStyles);

    developerButton.addEventListener('click', () => {
      resetStyles();
      developerMenu.classList.add('active');
      developerButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== developerButton) {
          button.style.display = "none";
        }
      });
    });

    exitDeveloperButton.addEventListener('click', resetStyles);

    tryNowButton.addEventListener('click', () => {
      resetStyles();
      mainTitle.classList.add('move-up');
      optionsDiv.classList.add('move-up');
      leftLine.classList.add('move-up');
      rightLine.classList.add('move-up');
      tryNowMenu.classList.add('active');
      tryNowButton.classList.add('large');
      buttons.forEach(button => {
        if (button !== tryNowButton) {
          button.style.display = "none";
        }
      });
    });

    exitTryNowButton.addEventListener('click', resetStyles);

    // Handle theme selection
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const theme = e.target.value;
        document.body.className = ""; // Reset theme classes
        document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
      });
    });

    // Handle background gradient customization
    const bgColor1 = document.getElementById("bg-color1");
    const bgColor2 = document.getElementById("bg-color2");

    [bgColor1, bgColor2].forEach((input) => {
      input.addEventListener("input", () => {
        document.body.style.background = `linear-gradient(180deg, ${bgColor1.value}, ${bgColor2.value})`;
      });
    });

    // Handle word animation color customization
    const wordColor1 = document.getElementById("word-color1");
    const wordColor2 = document.getElementById("word-color2");

    [wordColor1, wordColor2].forEach((input) => {
      input.addEventListener("input", () => {
        mainTitle.style.background = `linear-gradient(90deg, ${wordColor1.value}, ${wordColor2.value})`;
        mainTitle.style.backgroundSize = "400%";
        mainTitle.style.webkitBackgroundClip = "text";
        mainTitle.style.webkitTextFillColor = "transparent";
      });
    });
	
	// Select game list items and game container
const gameListItems = document.querySelectorAll(".game-list li");
const gameContainer = document.getElementById("gameContainer");

function loadGame(gameId) {
  switch (gameId) {
    case "snake-eater":
      gameContainer.innerHTML = `
        <h2>Snake Eater</h2>
        <button id="startSnakeGame">Play Snake Eater</button>
        <canvas id="gameCanvas"></canvas>
        <p>Score: <span id="score">0</span></p>`; // Add score display
      // Event listener for starting the game
      document.getElementById("startSnakeGame").addEventListener("click", () => {
        startSnakeGame();  // Start the Snake Game when the button is clicked
      });
      break;

    case "tic-tac-toe":
      gameContainer.innerHTML = `
        <h2>Tic Tac Toe</h2>
        <button id="startTicTacToe">Play Tic Tac Toe</button>`;
      document.getElementById("startTicTacToe").addEventListener("click", () => {
        startTicTacToe();
      });
      break;

    case "galaxy-shooting":
      gameContainer.innerHTML = `
        <h2>Galaxy Shooting</h2>
        <button id="startGalaxyShooting">Play Galaxy Shooting</button>`;
      document.getElementById("startGalaxyShooting").addEventListener("click", () => {
        alert("Starting Galaxy Shooting...");
      });
      break;

    case "type-speed":
      gameContainer.innerHTML = `
        <h2>Type Speed</h2>
        <button id="startTypeSpeed">Play Type Speed</button>`;
      document.getElementById("startTypeSpeed").addEventListener("click", () => {
        alert("Starting Type Speed...");
      });
      break;

    case "fly-bird":
      gameContainer.innerHTML = `
        <h2>Fly Bird</h2>
        <button id="startFlyBird">Play Fly Bird</button>`;
      document.getElementById("startFlyBird").addEventListener("click", () => {
        alert("Starting Fly Bird...");
      });
      break;

    default:
      gameContainer.innerHTML = "<p>Select a game to play.</p>";
  }
}

// Event listener for game list selection
gameListItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedGame = item.getAttribute("data-game");
    loadGame(selectedGame);
  });
});

// Example: Start Snake Game Logic
function startSnakeGame() {
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

  // Function to check if the snake collides with the walls or itself
  function checkCollisions() {
    const head = snake[0];
    // Wall collisions
    if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
      return true;
    }

    // Self collisions
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  // Function to update the score on the canvas
  function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
  }

  // Function to start the game
  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
        drawSnake();  // Draw the snake
        drawFood();   // Draw the food
        updateSnake();  // Update snake position
        updateScore();  // Update score

        if (checkCollisions()) {
          clearInterval(gameInterval);  // Stop the game if there is a collision
          alert('Game Over!');
        }
      }, snakeSpeed);
    }
  }

  // Event listeners for controlling the snake
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  });



  startGame();  // Start the game
}

function startTicTacToe() {
  // Inject the Tic Tac Toe board into the game container
  gameContainer.innerHTML = `
    <h2>Tic Tac Toe</h2>
    <div class="board">
      <div class="cell" data-index="0"></div>
      <div class="cell" data-index="1"></div>
      <div class="cell" data-index="2"></div>
      <div class="cell" data-index="3"></div>
      <div class="cell" data-index="4"></div>
      <div class="cell" data-index="5"></div>
      <div class="cell" data-index="6"></div>
      <div class="cell" data-index="7"></div>
      <div class="cell" data-index="8"></div>
    </div>
    <p id="status">Player X's turn</p>
    <button id="resetBtn">Reset</button>
  `;

  // JavaScript functionality for the game
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameActive = true;

  // Function to check for a winner
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        gameActive = false;
        statusText.textContent = `Player ${currentPlayer} wins!`;
        return;
      }
    }

    if (!board.includes('')) {
      gameActive = false;
      statusText.textContent = 'It\'s a tie!';
    }
  }

  // Function to handle cell clicks
  function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  // Function to reset the game
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
      cell.textContent = '';
    });
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  resetBtn.addEventListener('click', resetGame);
}

// Update your game loader to include Tic Tac Toe
function loadGame(gameId) {
  switch (gameId) {
    case "tic-tac-toe":
      startTicTacToe();
      break;
    // Other cases...
    default:
      gameContainer.innerHTML = "<p>Select a game to play.</p>";
  }
}

	
  startGame();  // Start the game
}

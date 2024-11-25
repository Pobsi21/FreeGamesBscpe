const gameListItems = document.querySelectorAll(".game-list li");
const gameContainer = document.getElementById("gameContainer");

// Function to load game based on selection
function loadGame(gameName) {
  switch (gameName.toLowerCase()) {
    case "tic tac toe":
      gameContainer.innerHTML = `
        <div id="game">
          <h1>Tic-Tac-Toe</h1>
          <div id="board">
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
          </div>
          <h2 id="status"></h2>
          <button id="restart">Restart Game</button>
        </div>`;
      break;

    case "snake eater":
      gameContainer.innerHTML = `
        <h2>Snake Eater</h2>
        <button id="startSnakeGame">Play Snake Eater</button>`;
      break;

    default:
      gameContainer.innerHTML = `<p>Select a game to play.</p>`;
  }
}

// Attach event listeners to the game list items
gameListItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedGame = item.textContent; // Get the game's name
    loadGame(selectedGame); // Load the selected game
  });
});

// Load the default game on page load
window.onload = () => {
  loadGame("Snake Eater"); // Default game is Snake Eater
};

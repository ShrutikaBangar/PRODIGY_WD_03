document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('#status');
    const resetButton = document.querySelector('#resetButton');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
  
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
  
    function handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
      }
  
      handleCellPlayed(clickedCell, clickedCellIndex);
      handleResultValidation();
    }
  
    function handleCellPlayed(clickedCell, clickedCellIndex) {
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
    }
  
    function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i < winPatterns.length; i++) {
        const winPattern = winPatterns[i];
        let a = gameState[winPattern[0]];
        let b = gameState[winPattern[1]];
        let c = gameState[winPattern[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
  
      let roundDraw = !gameState.includes("");
      if (roundDraw) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function handleReset() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => cell.textContent = "");
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleReset);
  });
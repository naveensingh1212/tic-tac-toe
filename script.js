
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 
let gameActive = true; 

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];


let gameStatusDisplay;
let gameCells;
let resetButtonElement;



function updateCell(cellElement, index) {
    board[index] = currentPlayer;
    cellElement.textContent = currentPlayer;
}

// 2. Handles a click event on any of the game cells
function handleCellClick(event) {
    const clickedCell = event.target;
    let clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (!gameActive || board[clickedCellIndex] !== '') {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);

 
     checkResult(); 
     if (gameActive) {
        changePlayer(); 
    }
    // updateStatus(); // Update the message display
}

// 3. Checks for a win or a draw (logic to be added)
function checkResult() {
    let roundWon = false; 

    for (const combination of winningConditions) {
        const cellA = board[combination[0]];
        const cellB = board[combination[1]];
        const cellC = board[combination[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }

 
        if (cellA === cellB && cellB === cellC) { 
            roundWon = true; 
            break; 
        }
    }

    if (roundWon) {
        gameActive = false; 
        gameStatusDisplay.textContent = `Player ${currentPlayer} Wins!`; 
        return; 
    }

    // If no one won, check for a draw (if all cells are filled)

    if (!board.includes('')) { 
        gameActive = false;
        gameStatusDisplay.textContent = `It's a Draw!`; 
        return; 
    }

}

// 4. Switches the current player (logic to be added)
function changePlayer() {
    if(currentPlayer =(currentPlayer === 'X')? 'O' : 'X')
    gameStatusDisplay.textContent = `Player ${currentPlayer} turn !`
}

// 5. Resets the game to its initial state (logic to be added)
function resetGame() {
    startGame();
}


// --- Initialization Function ---
// Sets up the game when the page loads or when reset.
function startGame() {
    // Get HTML element references
    gameStatusDisplay = document.getElementById('gameStatus');
    gameCells = document.querySelectorAll('.cell');
    resetButtonElement = document.getElementById('resetButton');

    // Reset game state
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Clear content from all HTML cells (important for resets)
    gameCells.forEach(cell => {
        cell.textContent = '';
    });

    // Attach event listeners
    gameCells.forEach(function (cell) {
        cell.addEventListener("click", handleCellClick);
    });

    resetButtonElement.addEventListener("click", resetGame);

    // Set the initial status message
    gameStatusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// --- Start the Game ---
// This line calls startGame() once when the script loads, setting up the game.
startGame();
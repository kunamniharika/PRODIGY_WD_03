const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (checkWinner()) {
        statusDisplay.innerHTML = `${currentPlayer} has won! 🎉`;
        statusDisplay.classList.add('winner');
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "♥️" : "X"; // Changed to heart symbol
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    statusDisplay.classList.remove('winner');

    cells.forEach(cell => {
        cell.innerHTML = "";
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

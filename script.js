const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let xScore = 0;
let oScore = 0;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', resetBoard);

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a,b,c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;

      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');

      statusText.textContent = `Player ${currentPlayer} Wins!`;

      if (currentPlayer === 'X') {
        xScore++;
        xScoreEl.textContent = xScore;
      } else {
        oScore++;
        oScoreEl.textContent = oScore;
      }

      return;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusText.textContent = `It's a Draw!`;
  }
}

function resetBoard() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
  });
}

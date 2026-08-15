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

  if (board[index] || !gameActive) return;

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

      celebrate();

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
    cell.classList.remove('x','o','win');
  });
}

function celebrate() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');

    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = `hsl(${Math.random()*360},100%,60%)`;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = 9999;

    document.body.appendChild(confetti);

    const duration = 2000 + Math.random() * 2000;

    confetti.animate(
      [
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
      ],
      { duration, easing: 'ease-out' }
    );

    setTimeout(() => confetti.remove(), duration);
  }
}

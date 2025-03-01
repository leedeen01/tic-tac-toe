import TicTacToeGame from './TicTacToeGame.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  const game = new TicTacToeGame(container);

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Game';
  resetButton.style.marginTop = '15px';
  resetButton.addEventListener('click', () => game.resetGame());
  container.appendChild(resetButton);
});

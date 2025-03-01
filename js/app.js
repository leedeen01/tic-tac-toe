import TicTacToeGame from './TicTacToeGame.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  const game = new TicTacToeGame(container);
});

import Player from "./Player.js";

export default class TicTacToeGame {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.board = Array(9).fill(null);
    this.currentPlayer = null;
    this.player1 = null;
    this.player2 = null;
    this.gameOver = false;

    this.initializePlayers();
    this.renderBoard();
  }

  initializePlayers() {
    const name1 = prompt("Enter Player 1 name (X):", "Player 1");
    const name2 = prompt("Enter Player 2 name (O):", "Player 2");
    this.player1 = new Player(name1, "X");
    this.player2 = new Player(name2, "O");
    this.currentPlayer = this.player1;
  }

  renderBoard() {
    this.containerElement.innerHTML = "";

    const emptyBoard = document.createElement("div");
    emptyBoard.classList.add("board");

    this.board.forEach((cellValue, index) => {
      const emptyBox = document.createElement("div");
      emptyBox.classList.add("cell");
      emptyBox.dataset.index = index;
      emptyBox.textContent = cellValue ? cellValue : "";
      emptyBox.addEventListener("click", () => this.handleCellClick(index));
      emptyBoard.appendChild(emptyBox);
    });

    this.containerElement.appendChild(emptyBoard);

    const gameStatus = document.createElement("div");
    gameStatus.id = "status";
    gameStatus.textContent = this.gameOver
      ? "Game Over"
      : `${this.currentPlayer.name}'s turn (${this.currentPlayer.sign})`;
    this.containerElement.appendChild(gameStatus);
  }

  handleCellClick(index) {
    if (this.gameOver || this.board[index]) {
      return;
    }
    this.board[index] = this.currentPlayer.sign;
    this.renderBoard();
    if (this.checkWinner()) {
      this.gameOver = true;
      setTimeout(() => {
        alert(`${this.currentPlayer.name} (${this.currentPlayer.sign}) wins!`);
      }, 100);
    } else if (this.board.every((cell) => cell !== null)) {
      this.gameOver = true;
      setTimeout(() => {
        alert(`It's a draw!`);
      }, 100);
    } else {
      this.switchPlayer();
      this.renderBoard();
    }
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.board[a] 
        && this.board[a] === this.board[b] 
        && this.board[a] === this.board[c]
      ) {
        return true;
      }
    }
    return false;
  }

  resetGame() {
    this.board = Array(9).fill(null);
    this.gameOver = false;
    this.currentPlayer = this.player1;
    this.renderBoard();
  }
}

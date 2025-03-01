import Player from "./Player.js";
import SetupForm from "./SetupForm.js";

export default class TicTacToeGame {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.board = Array(9).fill(null);
    this.currentPlayer = null;
    this.player1 = null;
    this.player2 = null;
    this.gameOver = false;

    new SetupForm(this.containerElement, (setupData) => {
      const { player1Name, player2Name, vsComputer } = setupData;
      this.initializePlayers(player1Name, player2Name, vsComputer);
      this.renderBoard();
    });
  }

  initializePlayers(player1Name, player2Name, vsComputer) {
    this.player1 = new Player(player1Name, "X");
    this.player2 = new Player(player2Name, "O", vsComputer);
    this.currentPlayer = this.player1;
    this.againstAI = vsComputer;
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
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
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
    const existingMessage = this.containerElement.querySelector(
      ".end-game-message"
    );
    if (existingMessage) {
      existingMessage.remove();
    }
    this.renderBoard();
  }

  renderBoard() {
    this.containerElement.innerHTML = "";

    const boardElement = document.createElement("div");
    boardElement.classList.add("board");

    this.board.forEach((cellValue, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = cellValue ? cellValue : "";
      cell.addEventListener("click", () => this.handleCellClick(index));
      boardElement.appendChild(cell);
    });

    this.containerElement.appendChild(boardElement);

    const gameStatus = document.createElement("div");
    gameStatus.id = "status";
    gameStatus.textContent = this.gameOver
      ? "Game Over"
      : `${this.currentPlayer.name}'s turn (${this.currentPlayer.sign})`;
    this.containerElement.appendChild(gameStatus);
  }

  displayEndGameMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("end-game-message");

    const messageText = document.createElement("p");
    messageText.textContent = message;
    messageContainer.appendChild(messageText);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    resetButton.addEventListener("click", () => this.resetGame());
    messageContainer.appendChild(resetButton);

    this.containerElement.appendChild(messageContainer);
  }

  handleCellClick(index) {
    if (this.gameOver || this.board[index]) return;

    this.board[index] = this.currentPlayer.sign;

    if (this.checkWinner()) {
      this.gameOver = true;
      this.renderBoard();
      this.displayEndGameMessage(
        `${this.currentPlayer.name} (${this.currentPlayer.sign}) wins!`
      );
      return;
    } else if (this.board.every((cell) => cell !== null)) {
      this.gameOver = true;
      this.renderBoard();
      this.displayEndGameMessage("It's a draw!");
      return;
    } else {
      this.switchPlayer();
      this.renderBoard();
      if (this.againstAI && this.currentPlayer === this.player2) {
        setTimeout(() => this.makeAiMove(), 300);
      }
    }
  }

  makeAiMove() {
    if (this.gameOver) return;

    const bestMoveIndex = this.player2.getBestMove(this.board, this.player1.sign);
    if (bestMoveIndex !== -1) {
      this.board[bestMoveIndex] = this.player2.sign;
    }

    if (this.checkWinner()) {
      this.gameOver = true;
      this.renderBoard();
      this.displayEndGameMessage(
        `${this.player2.name} (${this.player2.sign}) wins!`
      );
    } else if (this.board.every((cell) => cell !== null)) {
      this.gameOver = true;
      this.renderBoard();
      this.displayEndGameMessage("It's a draw!");
    } else {
      this.switchPlayer();
      this.renderBoard();
    }
  }
}

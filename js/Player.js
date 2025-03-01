export default class Player {
  constructor(name, sign, isAI = false) {
    this.name = name;
    this.sign = sign;
    this.isAI = isAI;
  }

  getBestMove(board, opponentSign) {
    let bestVal = -Infinity;
    let bestMove = -1;
    const moves = this.getActions(board);
    for (let move of moves) {
      board[move] = this.sign;
      const moveVal = this.minValue(board, 0, -Infinity, Infinity, opponentSign);
      board[move] = null;
      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = move;
      }
    }
    return bestMove;
  }

  getActions(board) {
    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        moves.push(i);
      }
    }
    return moves;
  }

  checkWinnerOnBoard(board) {
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
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  isTerminal(board) {
    return (
      this.checkWinnerOnBoard(board) !== null ||
      board.every((cell) => cell !== null)
    );
  }

  evaluateBoard(board, depth, opponentSign) {
    const winner = this.checkWinnerOnBoard(board);
    if (winner === this.sign) {
      return 10 - depth; 
    } else if (winner === opponentSign) {
      return depth - 10; 
    }
    return 0;
  }

  maxValue(board, depth, alpha, beta, opponentSign) {
    if (this.isTerminal(board)) {
      return this.evaluateBoard(board, depth, opponentSign);
    }

    let value = -Infinity;
    const moves = this.getActions(board);
    for (let move of moves) {
      board[move] = this.sign;
      value = Math.max(
        value,
        this.minValue(board, depth + 1, alpha, beta, opponentSign)
      );
      board[move] = null;
      if (value >= beta) {
        return value;
      }
      alpha = Math.max(alpha, value);
    }
    return value;
  }

  minValue(board, depth, alpha, beta, opponentSign) {
    if (this.isTerminal(board)) {
      return this.evaluateBoard(board, depth, opponentSign);
    }

    let value = Infinity;
    const moves = this.getActions(board);
    for (let move of moves) {
      board[move] = opponentSign;
      value = Math.min(
        value,
        this.maxValue(board, depth + 1, alpha, beta, opponentSign)
      );
      board[move] = null;
      if (value <= alpha) {
        return value;
      }
      beta = Math.min(beta, value);
    }
    return value;
  }
}

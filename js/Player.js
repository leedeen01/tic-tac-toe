export default class Player {

  static LOWDIFFICULTY = 0.4;
  static MIDDIFFICULTY = 0.2;
  static HIGHDIFFICULTY = 0.1;
  static IMPOSSIBLEDIFFICULTY = 0.0;

  constructor(name, sign, isAI = false, difficulty = "Low") {
    this.name = name;
    this.sign = sign;
    this.isAI = isAI;
    this.difficulty = difficulty;
  }

  getBestMove(board, opponentSign) {
    const moves = this.getActions(board);
    let randomChance;
    const difficultyLevel = this.difficulty.toLowerCase();
  
    if (difficultyLevel === "low") {
      randomChance = Player.LOWDIFFICULTY;
    } else if (difficultyLevel === "medium") {
      randomChance = Player.MIDDIFFICULTY;
    } else if (difficultyLevel === "hard") {
      randomChance = Player.HIGHDIFFICULTY;
    } else if (difficultyLevel === "impossible") {
      randomChance = Player.IMPOSSIBLEDIFFICULTY;
    } else {
      randomChance = Player.IMPOSSIBLEDIFFICULTY;
    }
  
    if (Math.random() < randomChance) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      return moves[randomIndex];
    }
  
    let bestVal = -Infinity;
    let bestMove = -1;
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

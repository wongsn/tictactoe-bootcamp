// check horizontals
// same row = board[x][0], board[x][1], board[x][2]
const checkRow = (row) => {
  let consecutiveRow = 0;
  for (let j = 0; j < boardSize; j += 1) {
    if (board[row][j] == currentPlayer) {
      consecutiveRow += 1;
    }
  }
  if (consecutiveRow == winCondition) {
    return true;
  }
  return false;
};

const checkCol = (column) => {
  let consecutiveCol = 0;
  for (let i = 0; i < boardSize; i += 1) {
    if (board[i][column] == currentPlayer) {
      consecutiveCol += 1;
    }
  }

  if (consecutiveCol == winCondition) {
    return true;
  }
  return false;
};

// check diagonals
// diagonal = either board [0][0], board[1][1], board[2][2]
const checkDownDiag = (row, column) => {
  let consecutiveDownDiag = 0;

  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (i == j && board[i][j] == currentPlayer) {
        consecutiveDownDiag += 1;
      } else {
        continue;
      }
    }
  }

  if (consecutiveDownDiag == winCondition) {
    return true;
  }
  return false;
};

const checkUpDiag = (row, column) => {
  let consecutiveUpDiag = 0;

  for (let i = 0; i < boardSize; i += 1) {
    // if boardSize is even
    if (boardSize % 2 == 0) {
      console.log('even');
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i)) % 2 == 1 && board[i][j] == currentPlayer) {
          consecutiveUpDiag += 1;
        }
      }
    } else {
      // if boardSize is odd
      console.log('odd');
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i) % 2 == 0) && board[i][j] == currentPlayer) {
          consecutiveUpDiag += 1;
        }
      }
    }
  }

  if (consecutiveUpDiag == winCondition) {
    return true;
  }
  return false;
};

const amendSquares = (type, row, column) => {
  if (type == 'col') {
    for (let i = 0; i < boardSize; i += 1) {
      if (board[i][column] == currentPlayer) {
        document.getElementById(`row${i}-col${column}`).classList.add('square-column');
        console.log('col');
      }
    }
  } else if (type == 'row') {
    for (let j = 0; j < boardSize; j += 1) {
      if (board[row][j] == currentPlayer) {
        document.getElementById(`row${row}-col${j}`).classList.add('square-row');
      }
    }
  } else if (type == 'updiag') {
    for (let i = 0; i < boardSize; i += 1) {
    // if boardSize is even
      if (boardSize % 2 == 0) {
        console.log('even');
        for (let j = 0; j < boardSize; j += 1) {
          if (j != boardSize - 1 - i) { continue; }
          else if ((Math.abs(j - i)) % 2 == 1 && board[i][j] == currentPlayer) {
            document.getElementById(`row${i}-col${j}`).classList.add('square-updiagonal');
          }
        }
      } else {
      // if boardSize is odd
        console.log('odd');
        for (let j = 0; j < boardSize; j += 1) {
          if (j != boardSize - 1 - i) { continue; }
          else if ((Math.abs(j - i) % 2 == 0) && board[i][j] == currentPlayer) {
            document.getElementById(`row${i}-col${j}`).classList.add('square-updiagonal');
          }
        }
      }
    }
  } else if (type == 'downdiag') { for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (i == j && board[i][j] == currentPlayer) {
        document.getElementById(`row${i}-col${j}`).classList.add('square-downdiagonal');
      } else {
        continue;
      }
    }
  }
  }
};

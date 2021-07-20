let consecutiveRow = 0;
let consecutiveCol = 0;
let consecutiveDownDiag = 0;
let consecutiveUpDiag = 0;

// check horizontals
// same row = board[x][0], board[x][1], board[x][2]
const checkRow = (row) => {
  console.log('Checking Rows...');
  for (let j = 0; j < boardSize; j += 1) {
    if (consecutiveRow == winCondition) {
      return true;
    }

    if (board[row][j] == currentPlayer) {
      consecutiveRow += 1;
    } else if (consecutiveRow !== winCondition && board[row][j] !== currentPlayer) {
      consecutiveRow = 0;
    }
  }

  console.log(`Consecutive Squares: ${consecutiveRow}`);
  return false;
};

const checkCol = (column) => {
  console.log('Checking Cols...');
  for (let i = 0; i < boardSize; i += 1) {
    if (consecutiveCol == winCondition) {
      return true;
    }
    if (board[i][column] == currentPlayer) {
      consecutiveCol += 1;
    } else if (consecutiveCol != winCondition && board[i][column] != currentPlayer) {
      consecutiveCol = 0;
    }
  }

  console.log(`Consecutive Squares: ${consecutiveCol}`);
  return false;
};

// check diagonals
// diagonal = either board [0][0], board[1][1], board[2][2]
const checkDownDiag = (row, column) => {
  console.log('Checking Downward Diagonals...');
  // const repeat = (boardsize - wincondition + 1)**2
  // for (let repeat = (boardsize - wincondition + 1)**2; repeat<0;repeat--){
  // let i = Math.floor((repeat-1)/2);
  // let j = (repeat-1)%2;
  // for (let repeat = (boardSize - winCondition + 1) ** 2; repeat > 0; repeat -= 1) {
  // produce repeat starting X and Y values
  // scopeboard

  for (let X = 0; X <= boardSize - winCondition; X++) {
    for (let Y = 0; Y <= boardSize - winCondition; Y++) {
      console.log(X, Y);
      if (consecutiveDownDiag == winCondition) {
        return true;
      }
      for (let i = X; i < X + winCondition; i += 1) {
        for (let j = Y; j < Y + winCondition; j += 1) {
          if ((Math.abs(j - i) <= boardSize - winCondition) && board[i][j] == currentPlayer) {
            consecutiveDownDiag += 1;
          } else if ((Math.abs(j - i) <= boardSize - winCondition) && board[i][j] !== currentPlayer) {
            consecutiveDownDiag = 0;
          } else {
            continue;
          }
          console.log(consecutiveDownDiag);
        }
      }

      consecutiveDownDiag = 0;
    }
  }
  console.log(`Consecutive Squares: ${consecutiveDownDiag}`);
  return false;
};

const checkUpDiag = (row, column) => {
  console.log('Checking Upward Diagonals...');
  for (let i = 0; i < boardSize; i += 1) {
    // if boardSize is even
    if (boardSize % 2 == 0) {
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i)) % 2 == 1 && board[i][j] == currentPlayer) {
          consecutiveUpDiag += 1;
        } else {
          consecutiveUpDiag = 0;
        }
      }
    } else {
      // if boardSize is odd
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i) % 2 == 0) && board[i][j] == currentPlayer) {
          consecutiveUpDiag += 1;
        } else {
          consecutiveUpDiag = 0;
        }
      }
    }
  }
  if (consecutiveUpDiag == winCondition) {
    return true;
  }
  console.log(`Consecutive Squares: ${consecutiveUpDiag}`);
  return false;
};

const amendSquares = (type, row, column) => {
  console.log('Amending squares...');
  if (type == 'col') {
    for (let i = 0; i < boardSize; i += 1) {
      if (board[i][column] == currentPlayer) {
        document.getElementById(`row${i}-col${column}`).classList.add('square-column');
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
          if (j !== boardSize - 1 - i) { continue; }
          else if ((Math.abs(j - i) % 2 == 0) && board[i][j] == currentPlayer) {
            document.getElementById(`row${i}-col${j}`).classList.add('square-updiagonal');
          }
        }
      }
    }
  } else if (type == 'downdiag') {
    for (let i = 0; i < boardSize; i += 1) {
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

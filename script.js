// To-Do List:

// same column = board[0][x], board[1][x], board[2][x]
// same row = board[x][0], board[x][1], board[x][2]
// diagonal = either board [0][0], board[1][1], board[2][2]
// or board[0][2],board[1][1], board[2][0]
// 3. Log the amount of wins and losses
// 4. Capture Exceptions e.g. clicking on the same place

// keep data about the game in a 2-D array
const board = [];
const boardSize = 4;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
let dataField;
let utilButton;

// boolean toggles
const hasStarted = false;

// current player global starts at X
let currentPlayer = 'X';
let currentTurn = 0;
let logXwins = 0;
let logOwins = 0;
let noOfsequentialSquares = 0;

// listener functions
let _listener = () => {};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < boardSize; i += 1) {
    // separate var for one row / row element
    board.push(['']);
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < boardSize; j += 1) {
      // one square element
      board[i].push('');
      const square = document.createElement('div');
      square.classList.add('square');
      square.id = `row${i}-col${j}`;

      if (i == 0 && j == 0) {
        square.classList.add('square-topleft');
      } else if (i == 0 && j == boardSize - 1) {
        square.classList.add('square-topright');
      } else if (i == boardSize - 1 && j == boardSize - 1) {
        square.classList.add('square-btmright');
      } else if (i == boardSize - 1 && j == 0) {
        square.classList.add('square-btmleft');
      }

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', _listener = () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const endGame = (winner) => {
  // reset noOfsequentialSquares
  if (winner == 'X') {
    logXwins += 1;
  } else {
    logOwins += 1;
  }

  currentPlayer = 'X';
  currentTurn = 0;
  noOfsequentialSquares = 0;

  for (let i = 0; i < boardSize - 1; i++) {
    for (let j = 0; j < boardSize - 1; j++) {
      boardContainer.children[i].children[j].removeEventListener('click', _listener);
    }
  }
};

// check horizontals
// same row = board[x][0], board[x][1], board[x][2]
const checkHorz = (row, column) => {
  for (let j = 0; j < boardSize; j += 1) {
    if (board[row][j] == currentPlayer) {
      noOfsequentialSquares += 1;
    }
  }

  if (noOfsequentialSquares == boardSize) {
    dataField.innerHTML = `${currentPlayer} wins horizontally in ${currentTurn} rounds!`;
    document.getElementById(`row${row}-col${column}`).classList.add('square-row');
    endGame(currentPlayer);
  } else {
    noOfsequentialSquares = 0;
    console.log('no horizontals');
  }
};

// check vertical
// same column = board[0][x], board[1][x], board[2][x]
const checkVert = (row, column) => {
  for (let i = 0; i < boardSize; i += 1) {
    if (board[i][column] == currentPlayer) {
      noOfsequentialSquares += 1;
    }
  }

  if (noOfsequentialSquares == boardSize) {
    dataField.innerHTML = `${currentPlayer} wins vertically in ${currentTurn} rounds!`;
    document.getElementById(`row${row}-col${column}`).classList.add('square-col');
    endGame(currentPlayer);
  } else {
    noOfsequentialSquares = 0;
    console.log('no verticals');
  }
};

// check diagonals
// diagonal = either board [0][0], board[1][1], board[2][2]
const checkDiagTopBtm = (row, column) => {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (i == j && board[i][j] == currentPlayer) {
        noOfsequentialSquares += 1;
      } else {
        continue;
      }
    }
  }
  console.log(`Sequential Squares:${noOfsequentialSquares}`);
  if (noOfsequentialSquares == boardSize) {
    dataField.innerHTML = `${currentPlayer} wins left diagonally in ${currentTurn} rounds!`;
    noOfsequentialSquares = 0;
    endGame(currentPlayer);
  } else {
    noOfsequentialSquares = 0;
    console.log('no left diagonal');
  }
};

// check diagonals
// diagonal = board[0][2],board[1][1], board[2][0]
const checkDiagBtmTop = (row, column) => {
  for (let i = 0; i < boardSize; i += 1) {
    // if boardSize is even
    if (boardSize % 2 == 0) {
      console.log('even');
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i)) % 2 == 1 && board[i][j] == currentPlayer) {
          noOfsequentialSquares += 1;
        }
      }
    } else {
      // if boardSize is odd
      console.log('odd');
      for (let j = 0; j < boardSize; j += 1) {
        if (j != boardSize - 1 - i) { continue; }
        else if ((Math.abs(j - i) == 0 || Math.abs(j - i) % 2 == 0) && board[i][j] == currentPlayer) {
          noOfsequentialSquares += 1;
        }
      }
    }
  }
  console.log(`Sequential Squares:${noOfsequentialSquares}`);
  if (noOfsequentialSquares == boardSize) {
    dataField.innerHTML = `${currentPlayer} wins right diagonally in ${currentTurn} rounds!`;
    endGame(currentPlayer);
    // reset global noOfsequentialSquaress
  } else {
    noOfsequentialSquares = 0;
    console.log('no right diagonal');
  }
};

const checkWin = (row, column) => {
  console.log('checking...');
  if (row == column) {
    checkDiagTopBtm(row, column);
    checkHorz(row, column);
    checkVert(row, column);
  } else if (column == boardSize - 1 - row) {
    checkDiagBtmTop(row, column);
    checkHorz(row, column);
    checkVert(row, column);
  } else {
    checkHorz(row, column);
    checkVert(row, column);
  }
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);
  console.log(currentPlayer);

  // see if the clicked square has been clicked on before
  if (!(board[row][column] === '')) {
    dataField.innerHTML = 'Click on another square';
  } else {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    currentTurn += 1;
    console.log(currentTurn);
    if (currentTurn >= (boardSize * 2) - 1) {
      checkWin(row, column);
    }

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    togglePlayer();
  }
};

const initGame = () => {
  boardContainer = document.createElement('div');
  boardContainer.classList.add('board');
  document.body.appendChild(boardContainer);

  dataField = document.createElement('div');
  dataField.classList.add('data');
  dataField.innerHTML = 'hello!';
  document.body.appendChild(dataField);

  utilButton = document.createElement('button');
  utilButton.classList.add('button');
  utilButton.innerHTML = 'start';
  document.body.appendChild(utilButton);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();

// To-Do List:

// same column = board[0][x], board[1][x], board[2][x]
// same row = board[x][0], board[x][1], board[x][2]
// diagonal = either board [0][0], board[1][1], board[2][2]
// or board[0][2],board[1][1], board[2][0]
// 3. Log the amount of wins and losses
// 4. Capture Exceptions e.g. clicking on the same place

// keep data about the game in a 2-D array
const board = [];
let boardSize = 3;
let winCondition = 3;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
let dataField;
let utilButton;

// boolean toggles
let canClick = true;

// current player global starts at X
let currentPlayer = 'X';
let currentTurn = 0;
let logXwins = 0;
let logOwins = 0;

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

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click',() => {
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
  if (winner == 'X') {
    logXwins += 1;
  } else {
    logOwins += 1;
  }

  currentPlayer = 'X';
  currentTurn = 0;
  canClick = false;
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);
  console.log(currentPlayer);

  // see if the clicked square has been clicked on before
  if (!(board[row][column] === '')) {
    dataField.innerHTML = 'Click on another square';
  } else if (!canClick) {

  } else if (currentTurn == boardSize * boardSize) {
    canClick = false;
  } else {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    currentTurn += 1;
    console.log(currentTurn);
    if (currentTurn >= winCondition * 2 - 1) {
      console.log('checking...');
      if (checkRow(row)) {
        amendSquares('row', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkCol(column)) {
        amendSquares('col', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkUpDiag(row, column)) {
        amendSquares('updiag', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkDownDiag(row, column)) {
        amendSquares('downdiag', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      }
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

  const inputBoardSize = document.createElement('input');
  inputBoardSize.classList.add('input');
  inputBoardSize.placeholder = 'Input boardsize';
  document.body.appendChild(inputBoardSize);

  const inputWinCondition = document.createElement('input');
  inputWinCondition.classList.add('input');
  inputWinCondition.placeholder = 'Input win condition';
  document.body.appendChild(inputWinCondition);

  const aiOptions = document.createElement('select');
  aiOptions.classList.add('select');

  const easyAI = document.createElement('option');
  easyAI.text = 'Easy';
  const medAI = document.createElement('option');
  medAI.text = 'Medium';
  const hardAI = document.createElement('option');
  hardAI.text = 'Hard';
  aiOptions.append(easyAI, medAI, hardAI);
  document.body.appendChild(aiOptions);

  utilButton.addEventListener('click', () => {
    boardSize = inputBoardSize.value > 3 ? inputBoardSize.value : 3;
    winCondition = inputWinCondition.value > inputBoardSize.value ? inputBoardSize.value : inputWinCondition.value;
    console.log(boardSize, winCondition);
    // build the board - right now it's empty
    buildBoard(board);
  });
};

initGame();

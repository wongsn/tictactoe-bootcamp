// To-Do List:
// 1. Create a status window to capture user behaviour
// 2. Win/Loss Logic
// checkWin = (currentPlayer)=> { if same column, same row or diagonal, change winner = player}
// check only after turn 3;
// same column = board[0][x], board[1][x], board[2][x]
// same row = board[x][0], board[x][1], board[x][2]
// diagonal = either board [0][0], board[1][1], board[2][2]
// or board[0][2],board[1][1], board[2][0]
// 3. Log the amount of wins and losses
// 4. Capture Exceptions e.g. clicking on the same place

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
let dataField;
let utilButton;

// boolean toggles
const hasStarted = false;

// current player global starts at X
let currentPlayer = 'X';
const turnNumber = 1;

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
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

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
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

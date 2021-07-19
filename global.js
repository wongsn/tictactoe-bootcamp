/* eslint-disable prefer-const */
// keep data about the game in a 2-D array
let board = [];
let boardSize = 3;
let winCondition = 3;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
let dataField;
let utilButton;

// boolean toggles
let canClick = true;

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
    console.log('current player is O');
  } else {
    currentPlayer = 'X';
    console.log('current player is X');
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
    if (inputWinCondition.value > inputBoardSize.value) {
      winCondition = inputBoardSize.value;
    } else if (inputWinCondition.value > 0) {
      winCondition = inputWinCondition.value;
    }
    console.log(boardSize, winCondition);
    // build the board - right now it's empty
    buildBoard(board);
  });
};

initGame();

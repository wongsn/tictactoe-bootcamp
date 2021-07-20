const nextPlayer = () => {
  if (AIdifficulty == 'player2') {

  } else if (AIdifficulty == 'easy') {
    easyComp();
  } else if (AIdifficulty == 'medium') {
    easyComp();
  } else if (AIdifficulty == 'hard') {
    easyComp();
  }
};

const endGame = (winner) => {
  if (winner == 'X') {
    logXwins += 1;
  } else if (winner == 'O') {
    logOwins += 1;
  } else if (winner == 'none') {

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
    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (currentTurn >= winCondition * 2 - 1) {
      console.log('checking...');
      console.log(currentPlayer);
      if (checkRow(row)) {
        console.log('checking row');
        amendSquares('row', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
        return;
      } if (checkCol(column)) {
        console.log('checking col');
        amendSquares('col', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
        return;
      } if (checkUpDiag(row, column)) {
        console.log('checking up diagonal');
        amendSquares('updiag', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
        return;
      } if (checkDownDiag(row, column)) {
        console.log('checking downward diagonal');
        amendSquares('downdiag', row, column);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
        return;
      }
    }

    // change the player
    togglePlayer();
    setTimeout(() => { nextPlayer(); }, 500);
  }
};

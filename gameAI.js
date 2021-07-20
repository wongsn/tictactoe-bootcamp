const getRandomNumber = () => Math.floor(Math.random() * boardSize);

const easyComp = () => {
  const randomRow = getRandomNumber();
  const randomCol = getRandomNumber();
  // see if the clicked square has been clicked on before
  if ((board[randomRow][randomCol] !== '') || !canClick) {
    easyComp();
  } else if (currentTurn == boardSize * boardSize) {
    canClick = false;
  } else {
    console.log('coordinates', randomRow, randomCol);
    console.log(currentPlayer);

    currentTurn += 1;
    board[randomRow][randomCol] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (currentTurn >= winCondition * 2 - 1) {
      console.log('checking...');
      if (checkRow(randomRow)) {
        console.log('checking row');
        amendSquares('row', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkCol(randomCol)) {
        console.log('checking col');
        amendSquares('col', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkUpDiag(randomRow, randomCol)) {
        console.log('checking up diagonal');
        amendSquares('updiag', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkDownDiag(randomRow, randomCol)) {
        console.log('checking downward diagonal');
        amendSquares('downdiag', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else {

      }
    }
    // change the player
    togglePlayer();
  }
};

const medComp = () => {
  const randomRow = getRandomNumber();
  const randomCol = getRandomNumber();
  // see if the clicked square has been clicked on before
  if ((board[randomRow][randomCol] !== '') || !canClick) {
    easyComp();
  } else if (currentTurn == boardSize * boardSize) {
    canClick = false;
  } else {
    console.log('coordinates', randomRow, randomCol);
    console.log(currentPlayer);

    currentTurn += 1;
    board[randomRow][randomCol] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (currentTurn >= winCondition * 2 - 1) {
      console.log('checking...');
      if (checkRow(randomRow)) {
        console.log('checking row');
        amendSquares('row', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkCol(randomCol)) {
        console.log('checking col');
        amendSquares('col', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkUpDiag(randomRow, randomCol)) {
        console.log('checking up diagonal');
        amendSquares('updiag', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else if (checkDownDiag(randomRow, randomCol)) {
        console.log('checking downward diagonal');
        amendSquares('downdiag', randomRow, randomCol);
        dataField.innerHTML = `${currentPlayer} wins in ${currentTurn} rounds!`;
        endGame(currentPlayer);
      } else {

      }
    }
    // change the player
    togglePlayer();
  }
};

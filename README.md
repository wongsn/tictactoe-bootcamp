# Tic Tac Toe

## Base
### Check Win
Add a checkWin function when the player clicks a square. When the game is won, display the winner on the screen and reset the game.

```js
const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    // XXX
  }

  if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    // X
    // X
    // X
  }
};

const squareClick = function (column, row) {
  if (board[column][row] === '') {
    board[column][row] = currentPlayer;
    if (checkWin() === true) {
      // game over
    } else {
      togglePlayer();
    }
  }
};
```

## Comfortable
Check for the win by advancing through the game board with two nested loops. You will need to be able to write a loop that moves vertically, horizontally, diagonally left to right and diagonally right to left across the board.

If we imagine that the board element indexes create coordinates, board[i][j] is like 0,0; What is a loop where the coordinate numbers change in the pattern we want? i.e., 0,0 -> 0,1 -> 0,2 moves across the top of the board horizontally.

## More Comfortable
### User Choice Board
Allow the user to enter the size of board they want.

### User Choice Win
Allow the user to enter the number of squares in a row that makes a win.

### Computer Player 1
Create a computer player that makes a random square choice to play.
### Computer Player 2
Create a computer player that will make a random choice, unless the player is about to win, then blocks them.
### Computer Player 3
Create a computer player that tries to win the game.

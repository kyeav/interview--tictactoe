// array of 9 buttons
const allSquares = document.querySelectorAll(".board__square");
// console.log(allSquares);

const title = document.querySelector(".board__title");

// loop over every single square, add event listener on every single node, set inner HTML
// i is index
// for (let i = 0; i < allSquares.length; i++) {
//     console.log(allSquares[i])
// }

let currentPlayer = "X";

// let board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']
let board = new Array(9).fill(undefined); // .fill(undefined) because .every method only loops through elements that arent empty

let gameOver = false;

allSquares.forEach((square, i) => {
  //   console.log(square, i);

  square.addEventListener("click", () => {
    // console.log("clicked");

    if (square.innerHTML || gameOver) {
      //does not allow player to click same square twice
      return;
    }

    // step 1: when we click on a game square, show if its X or O
    // X if player 1, O if player 2
    // update h1 to say whose turn it is
    square.innerHTML = currentPlayer;

    board[i] = currentPlayer;
    // console.log(board)

    // step 2: determine when game ends
    // when you click on a square, check to see if the game ended (win or draw)
    // update text when game ends
    if (checkWin()) {
      //if win , if checkWin() is true
      console.log("this runs");

      title.innerHTML = `${currentPlayer} Wins!`;
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      console.log("its a draw");

      title.innerHTML = "Draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function restartGame() {
  console.log("restart");

  gameOver = false;

  // reset board
  board = new Array(9).fill(undefined);

  // reset DOM
  allSquares.forEach((square) => {
    square.innerHTML = "";
  });

  // reset title
  title.innerHTML = `${currentPlayer}'s Turn`;
}

function checkDraw() {
  console.log(board);

  return board.every((symbol) => {
    //loops through elements that arent empty
    if (symbol) {
      // if there's no empty elements
      return true;
    }
  });

  // for (let i= 0; i < board.length; ++i) {
  //     if (!board[i]) { //if there's empty elements
  //         return false
  //     }
  // }
  // return true
}

function checkWin() {
  const winningIndices = [
    // horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndices.length; ++i) {
    // console.log(winningIndices[i][0]);

    // e.g. [0, 4, 8]
    const matchingIndices = winningIndices[i];
    // console.log(matchingIndices);
    let symbol1 = board[matchingIndices[0]]; // 0
    let symbol2 = board[matchingIndices[1]]; // 4
    let symbol3 = board[matchingIndices[2]]; // 8

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    // XXX or OOO
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      //   console.log("winner at", matchingIndices);
      return true;
    }
  }
}

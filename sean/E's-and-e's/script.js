var originalBoard;
const playerOne = 'e';
const playerTwo = 'E';
let playerOneWins = 0;
let playerTwoWins = 0;
let currentTurn = 'playerOne';

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
    document.querySelector('.endgame').style.display = 'none' ;
    originalBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
      cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof originalBoard[square.target.id] == 'number') {
      if(currentTurn === 'playerOne') {
        turn(square.target.id, playerOne);
        currentTurn = 'playerTwo'

      }
      else {
        turn(square.target.id, playerTwo);
        currentTurn = 'playerOne'
      }
      checkTie();
    }

}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    let gameWon = checkWin(originalBoard, player);
    if (gameWon) gameOver(gameWon);

}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
    let gameWon = null;

    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }
    return gameWon;

}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor = gameWon.player == playerOne ? 'green' : 'purple';

    }
    for (var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick, false);
    }
    if (gameWon.player == playerOne) {
      playerOneWins++;
      /* playerOneWins = playerOneWins + 1 */
    } else if (gameWon.player == playerTwo) {
      playerTwoWins ++;
    }
    declareWinner(gameWon.player == playerOne ? 'Player Two Loses :(. Player One is a Clever Human' : 'Player One Loses :(. Player Two is a Clever Human')

}

function declareWinner(who) {
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = who;
    document.querySelector('.counterP1 .text').innerText = playerOneWins ;
    document.querySelector('.counterP2 .text').innerText = playerTwoWins ;
}

function emptySquares() {
    return originalBoard.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0) {
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'green';
        cells[i].removeEventListener('click', turnClick, false);
      }
      declareWinner('Tie Game :|. Clever Humans!')
      return true;
    }
    return false;

}

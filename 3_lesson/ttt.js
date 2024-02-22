const util = require('./utilities.js');
const MESSAGES = require('./ttt_messages.json');
const EMPTY_MARKER = ' ';
const PLAYER_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const MAX_SCORE = 5;
const WIN_COMBOS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function joinOr(arr, delimiter = ', ', finalDelimiter = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return arr.join('');
    case 2:
      return `${arr[0]} ${finalDelimiter} ${arr[1]}`;
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
        ' ' +
        finalDelimiter +
        ' ' +
        arr.slice(arr.length - 1);
  }

}

function displayBoard(board) {
  console.clear();
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' ',
  };
  return board;
}


function getEmptySquares(board) {
  return Object.keys(board).filter(key => board[key] === EMPTY_MARKER);
}

function boardFull(board) {
  return getEmptySquares(board).length === 0;
}
function findStaticValue(board) {
  let winner = detectWinner(board);
  if (winner === 'computer') {
    return 1;
  } else if (winner === 'player') {
    return -1;
  } else {
    return 0;
  }
}

function generatePossibleMoves(board, currentMarker) {
  let emptySquares = getEmptySquares(board);
  let possibleMoves = [];

  emptySquares.forEach(square => {
    let boardCopy = Object.assign({}, board);
    boardCopy[square] = currentMarker;
    possibleMoves.push({
      board: boardCopy,
      position: square,
    });
  });
  return possibleMoves;
}

function findOptimalMove(board, maximizingPlayer) {
  let minMaxEval = maximizingPlayer ? -Infinity : Infinity;
  let currentMinMaxMove = null;
  const marker = maximizingPlayer ? COMPUTER_MARKER : PLAYER_MARKER;
  let possibleMoves = generatePossibleMoves(board, marker);

  possibleMoves.forEach(move => {
    let evalMove = miniMax(move.board, !maximizingPlayer);
    let moveScore = evalMove.score;
    if (maximizingPlayer) {
      if (moveScore > minMaxEval) {
        minMaxEval = moveScore;
        currentMinMaxMove = move.position;
      }
    } else if (!maximizingPlayer) {
      if (moveScore < minMaxEval) {
        minMaxEval = moveScore;
        currentMinMaxMove = move.position;
      }
    }
  });

  return {
    position: currentMinMaxMove,
    score: minMaxEval,
  };

}

function miniMax(board, maximizingPlayer = true) {
  let choice = {
    position: undefined,
    score: undefined,
  };

  if (someoneWon(board) || boardFull(board)) {
    choice.score = findStaticValue(board);
    return choice;
  }

  return findOptimalMove(board, maximizingPlayer);
}

function detectWinner(board) {
  let winner = undefined;
  WIN_COMBOS.forEach(combo => {
    let [posA, posB, posC] = combo;

    if (
      board[posA] === board[posB] &&
      board[posB] === board[posC] &&
      board[posA] !== EMPTY_MARKER
    ) {
      if (board[posA] === COMPUTER_MARKER) {
        winner = 'computer';
      } else {
        winner = 'player';
      }
    }
  });
  return winner;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function playerChoosesSquare(board) {
  let square;
  let emptySquares = getEmptySquares(board);

  square = util.getValidInput(
    `${MESSAGES.playerChoose} ${joinOr(emptySquares)}`,
    `${MESSAGES.playerChooseError} ${joinOr(emptySquares)}`,
    emptySquares);

  board[square] = PLAYER_MARKER;
}

function computerChoosesSquare(board) {
  let emptySquares = getEmptySquares(board);
  let aiGuess = miniMax(board).position;
  let randSquare = util.randomObjValue(emptySquares);
  let squareChoice = aiGuess ? aiGuess : randSquare;
  board[squareChoice] = COMPUTER_MARKER;
}

function initScore() {
  return {
    player: 0,
    computer: 0,
  };
}

function playIndividualGame(board) {
  while (true) {
    displayBoard(board);
    playerChoosesSquare(board);
    if (boardFull(board) || someoneWon(board)) {
      displayBoard(board);
      break;
    }

    computerChoosesSquare(board);
    if (boardFull(board) || someoneWon(board)) {
      displayBoard(board);
      break;
    }
  }
}

function logAndDisplayWinner(board, score) {
  let winner = detectWinner(board);
  console.log(winner ? `The ${winner} won!` : MESSAGES.tie);

  if (winner === 'computer') {
    score.computer += 1;
  } else if (winner === 'player') {
    score.player += 1;
  }

  console.log(`The score is:\n Player: ${score.player} \n Computer: ${score.computer}`);

  if (score.computer === MAX_SCORE) {
    console.log(MESSAGES.computerMaxScore);
    score = initScore();
  } else if (score.player === MAX_SCORE) {
    console.log(MESSAGES.playerMaxScore);
    score = initScore();
  }
}

function playTTT() {
  let score = initScore();

  //keep playing games until user breaks by entering 'n' at end of play
  while (true) {
    let board = initializeBoard();

    playIndividualGame(board);
    logAndDisplayWinner(board, score);

    let keepPlaying = util.getValidInput(
      MESSAGES.promptPlayAgain,
      MESSAGES.promptPlayAgainError,
      ['y', 'Y', 'N', 'n', '']
    );
    if (keepPlaying === 'n' || keepPlaying === 'N') break;
  }

  util.prompt(MESSAGES.goodbye);

}

playTTT();

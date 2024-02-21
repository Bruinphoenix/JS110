const readline = require('readline-sync');
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
]

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
  }
  return board;
}


function getEmptySquares(board) {
  return Object.keys(board).filter(key => board[key] === EMPTY_MARKER);
}

function boardFull(board) {
  return getEmptySquares(board).length === 0;
}

function aiNextMove(board) {
  // TODO add nextMove documentation
  let selectedMove = undefined;

  function calcWinMove(marker) {
    WIN_COMBOS.forEach(combo => {
      [a, b, c] = combo;
      [markAtA, markAtB, markAtC] = [board[a], board[b], board[c]];

      if (markAtA === marker && markAtB === marker && markAtC === EMPTY_MARKER) {
        selectedMove = c;
      }
      if (markAtB === marker && markAtC === marker && markAtA === EMPTY_MARKER) {
        selectedMove = a;
      }
      if (markAtA === marker && markAtC === marker && markAtB === EMPTY_MARKER) {
        selectedMove = b;
      }
    })
  }

  //defensive iteration, attemps to find a place where the human player only needs one more move to win 
  calcWinMove(PLAYER_MARKER);
  //offensive loop, tries to find a place the computer could win
  calcWinMove(COMPUTER_MARKER);

  return selectedMove;
}



function detectWinner(board) {
  let winner = undefined;
  WIN_COMBOS.forEach(combo => {
    [a, b, c] = combo;
    debugger;

    if (
      board[a] === board[b] &&
      board[b] === board[c] &&
      board[a] !== EMPTY_MARKER
    ) {
      if (board[a] === COMPUTER_MARKER) {
        winner = 'computer';
      } else {
        winner = 'player';
      }
    }
  })
  return winner;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function playerChoosesSquare(board) {
  const emtpyMarker = ' ';
  let square;
  let emptySquares = getEmptySquares(board);

  square = util.getValidInput(
    `${MESSAGES.playerChoose} ${joinOr(emptySquares, ', ', 'or')}`,
    `${MESSAGES.playerChooseError} ${emptySquares}`,
    emptySquares);

  board[square] = PLAYER_MARKER;
}

function computerChoosesSquare(board) {
  let emptySquares = getEmptySquares(board);
  let aiGuess = aiNextMove(board);
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

function playTTT() {
  let score = initScore();

  //keep playing games until user manually breaks by entering 'n' at the end of play
  while (true) {
    let board = initializeBoard();

    //display board and keep prompting play until one of the players has won
    while (true) {
      displayBoard(board);
      playerChoosesSquare(board);
      if (boardFull(board) || someoneWon(board)) {
        displayBoard(board);
        break;
      };

      computerChoosesSquare(board);
      if (boardFull(board) || someoneWon(board)) {
        displayBoard(board);
        break;
      };
    }

    let winner = detectWinner(board);
    if (winner) {
      console.log(`The ${winner} won!`)
    } else {
      console.log(MESSAGES.tie);
    }

    if (winner === 'computer') {
      score.computer += 1;
    } else if (winner === 'player') {
      score.player += 1;
    }

    console.log(`The score is:\n Player: ${score.player} \n Computer: ${score.computer}`)

    if (score.computer === MAX_SCORE) {
      console.log(MESSAGES.computerMaxScore);
      score = initScore();
    } else if (score.player === MAX_SCORE) {
      console.log(MESSAGES.playerMaxScore);
      score = initScore();
    }

    let keepPlaying = util.getValidInput(
      MESSAGES.promptPlayAgain,
      MESSAGES.promptPlayAgainError,
      ['y', 'Y', 'N', 'n', '']
    )
    if (keepPlaying === 'n' || keepPlaying === 'N') break;
  }
  util.prompt(MESSAGES.goodbye);

}
playTTT();
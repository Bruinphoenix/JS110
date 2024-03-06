const util = require('./utilities.js');
const readline = require('readline-sync');
const WINNING_VALUE = 21;
const MESSAGES = require('./twentyOne_messages.json');
const padToTarget = util.padToTarget;

//CARD
function Card(suit, value) {

  //GETTERS
  Object.defineProperty(this, 'suit', {
    get: function () {
      return suit;
    },
  });

  Object.defineProperty(this, 'value', {
    get: function () {
      return value;
    },
  });
}

//____________________________________________________________________________
//DECK
function Deck() {
  const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
  const deck = [];
  newDeck();

  function newDeck() {
    SUITS.forEach(suit => {
      VALUES.forEach(value => {
        const card = new Card(suit, value);
        deck.push(card);
      });
    });
    shuffleDeck();
  }

  //PRIVATE METHODS
  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const replacer = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[replacer]] = [deck[replacer], deck[i]];
    }
  }

  //PUBLIC METHODS
  this.deal = function (numberOfCards) {

    if (deck.length < numberOfCards) {
      newDeck();
    }

    let cards = [];
    for (let cardsDealt = 0; cardsDealt < numberOfCards; cardsDealt++) {
      cards.push(deck.pop());
    }
    return cards;
  };

}

//______________________________________________________________________
function Player() {
  this.name = undefined;
  this.score = 0;
  const cards = [];

  //PUBLIC METHODS
  Object.defineProperty(this, 'cards', {
    get: function () {
      return cards;
    }
  });

  this.pushCards = function (dealt) {
    dealt.forEach(card => {
      cards.push(card);
    });
  };

  this.discardCards = function () {
    while (cards.length) {
      cards.pop();
    }
  };

  this.calcHandValue = function () {
    function cardValue(card) {
      if (typeof card.value === 'number') {
        return card.value;
      }
      return 10;
    }

    let aces = cards.filter(card => card.value === 'Ace');
    let notAces = cards.filter(card => card.value !== 'Ace');

    let handValue = notAces.reduce((acc, card) => {
      return acc + cardValue(card);
    }, 0);

    while (aces.length) {
      if (WINNING_VALUE - handValue < (aces.length * 11)) {
        handValue += 1;
        aces.pop();
      } else {
        handValue += 11;
        aces.pop();
      }
    }
    return handValue;
  };
}

//_______________________________________________________________________
function GameVariables() {
  this.playerTurnOver = false;
  this.dealerTurnOver = false;
  this.gameStarted = false;
  this.gameOver = false;

  this.numberOfHands = undefined;
  this.handsPlayed = 0;
}
//_______________________________________________________________________

function GameObject() {
  const deck = new Deck();
  const player = new Player();
  const dealer = new Player();
  const GV = new GameVariables();

  //INITIALIZATION METHODS
  const init = {
    match: function () {
      function resetGameValues() {
        player.discardCards();
        dealer.discardCards();
        player.score = 0;
        dealer.score = 0;

        GV.playerTurnOver = false;
        GV.dealerTurnOver = false;
        GV.gameStarted = false;
        GV.gameOver = false;
        GV.numberOfHands = undefined;
        GV.handsPlayed = 0;
      }

      resetGameValues();
      display.displayState();

      GV.numberOfHands = util.getValidNumber(
        MESSAGES.promptNumHands,
        MESSAGES.numHandsError, false);

      console.log(`Great! Lets play ${GV.numberOfHands} hands together!`);
    },

    game: function () {
      //clear old hands
      player.discardCards();
      dealer.discardCards();
      //deal 2 cards to player & dealer
      player.pushCards(deck.deal(2));
      dealer.pushCards(deck.deal(2));
      GV.playerTurnOver = false;
      GV.dealerTurnOver = false;
      GV.gameStarted = true;
      GV.gameOver = false;
    },

    playerInfo: function () {
      display.displayState();
      console.log(MESSAGES.promptPlayerName);
      player.name = readline.question().toUpperCase();
    },
  };

  //DISPLAY METHODS
  const display = {
    displayHandOver: function () {
      const winner = gameLogic.checkForWin();
      if (winner === 'player') {
        console.log(MESSAGES.playerWinHand);
        player.score += 1;
      } else if (winner === 'dealer') {
        console.log(MESSAGES.dealerWinHand);
        dealer.score += 1;
      } else {
        console.log(MESSAGES.tieHand);
      }
      console.log(`THE SCORE IS: \nDEALER: ${dealer.score} GAMES \n${player.name}: ${player.score} GAMES`);
    },

    displayFinalState: function () {
      //this is what displayState should look like
      //but I figured that out after it was finished
      //for the second time...
      const TOTAL_WIDTH = 59;

      let winnerMessage;
      if (player.score > dealer.score) {
        winnerMessage = MESSAGES.playerWinMatch;
      } else if (player.score < dealer.score) {
        winnerMessage = MESSAGES.dealerWinMatch;
      } else {
        winnerMessage = MESSAGES.tieMatch;
      }
      console.clear();
      console.log(' ' + '_'.repeat(TOTAL_WIDTH - 2) + ' ');
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${padToTarget('THANK YOU FOR PLAYING 21!', TOTAL_WIDTH - 2, true)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${padToTarget('THE FINAL SCORE IS:', TOTAL_WIDTH - 2, true)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${padToTarget(`DEALER: ${dealer.score}`, TOTAL_WIDTH - 2, true)}|`);
      //console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${padToTarget(`${player.name}: ${player.score}`, TOTAL_WIDTH - 2, true)}|`);
      console.log(`|${' '.repeat(TOTAL_WIDTH - 2)}|`);
      console.log(`|${padToTarget(winnerMessage, TOTAL_WIDTH - 2, true)}|`);
      console.log('|' + '_'.repeat(TOTAL_WIDTH - 2) + '|');

      const playAnotherMatch = util.getValidInput(MESSAGES.promtPlayAgain, MESSAGES.playAgainError, ['Y', 'N', 'y', 'n']);
      if (playAnotherMatch === 'y' || playAnotherMatch === 'Y') {
        return true;
      } else {
        return false;
      }
    },

    displayState: function () {
      function returnOf(card, display = true) {
        if (card && display) {
          return padToTarget('OF',);
        } else if (card) {
          return " HIDDEN ";
        }
        return padToTarget('', 8, false);
      }

      function returnSuit(card, display = true) {
        if (card && display) {
          return padToTarget(`${card.suit}`);
        }
        return padToTarget('', 8, false);
      }

      function returnValue(card, display = true) {
        if (card && display) {
          return padToTarget(`${card.value}`);
        }
        return padToTarget('', 8, false);
      }

      function returnScore(player, display = true) {
        if (display) {
          return padToTarget(String(player.calcHandValue()), 62, display);
        }
        return padToTarget('HIDDEN', 62, true);

      }
      let roundsPlayed = padToTarget(`PLAYING ROUND: ${GV.handsPlayed + 1} of ${GV.numberOfHands}`, 36, true);
      console.clear();
      console.log(
        `  _____________________________________________________________________________________________________________________________\n`,
        `|${padToTarget(player.name ? `${player.name.toUpperCase()}'S CARDS:` : 'PLAYER\'S CARDS:', 43, true)}|${GV.gameStarted ? roundsPlayed : ' '.repeat(36)}|${padToTarget('DEALER\'S CARDS:', 44, true)}|\n`,
        `|___________________________________________|____________________________________|____________________________________________|\n`,
        `|   ________    ________    ________    ________    ________   |   ________    ________    ________    ________    ________   |\n`,
        `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
        `|  |${returnValue(player.cards[0])}|  |${returnValue(player.cards[1])}|  |${returnValue(player.cards[2])}|  |${returnValue(player.cards[3])}|  |${returnValue(player.cards[4])}|\
  |  |${returnValue(dealer.cards[0])}|  |${returnValue(dealer.cards[1], GV.gameOver)}|  |${returnValue(dealer.cards[2], GV.gameOver)}|  |${returnValue(dealer.cards[3], GV.gameOver)}|  |${returnValue(dealer.cards[4], GV.gameOver)}|  |\n`,
        `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
        `|  |${returnOf(player.cards[0])}|  |${returnOf(player.cards[1])}|  |${returnOf(player.cards[2])}|  |${returnOf(player.cards[3])}|  |${returnOf(player.cards[4])}|\
  |  |${returnOf(dealer.cards[0])}|  |${returnOf(dealer.cards[1], GV.gameOver)}|  |${returnOf(dealer.cards[2], GV.gameOver)}|  |${returnOf(dealer.cards[3], GV.gameOver)}|  |${returnOf(dealer.cards[4], GV.gameOver)}|  |\n`,
        `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
        `|  |${returnSuit(player.cards[0])}|  |${returnSuit(player.cards[1])}|  |${returnSuit(player.cards[2])}|  |${returnSuit(player.cards[3])}|  |${returnSuit(player.cards[4])}|\
  |  |${returnSuit(dealer.cards[0])}|  |${returnSuit(dealer.cards[1], GV.gameOver)}|  |${returnSuit(dealer.cards[2], GV.gameOver)}|  |${returnSuit(dealer.cards[3], GV.gameOver)}|  |${returnSuit(dealer.cards[4], GV.gameOver)}|  |\n`,
        `|  |________|  |________|  |________|  |________|  |________|  |  |________|  |________|  |________|  |________|  |________|  |\n`,
        `|______________________________________________________________|______________________________________________________________|\n`,
        `|${padToTarget(player.name ? `${player.name.toUpperCase()}'S SCORE:` : 'PLAYER\'S SCORE:', 62, true)}|${padToTarget('DEALER\'S SCORE:', 62, true)}|\n`,
        `|______________________________________________________________|______________________________________________________________|\n`,
        `|                                                              |                                                              |\n`,
        `|${returnScore(player)}|${returnScore(dealer, GV.gameOver)}|\n`,
        `|______________________________________________________________|______________________________________________________________|\n`,
      );
    }
  };

  //GAME LOGIC METHODS
  const gameLogic = {
    checkForWin: function () {
      const dealerScore = dealer.calcHandValue();
      const playerScore = player.calcHandValue();

      if (dealerScore > 21) {
        GV.gameOver = true;
        return 'player';
      }

      if (playerScore > 21) {
        GV.gameOver = true;
        return 'dealer';
      }

      if (GV.dealerTurnOver) {
        GV.gameOver = true;
        if (dealerScore > playerScore) {
          return 'dealer';
        }
        if (playerScore === dealerScore) {
          return false;
        } else {
          return 'player';
        }
      }
      return false;
    },

    dealerTakeTurn: function () {
      while (dealer.calcHandValue() < 17) {
        dealer.pushCards(deck.deal(1));
      }
      GV.dealerTurnOver = true;
    },

    playerTakeTurn: function () {
      let wantToHit = util.getValidInput(MESSAGES.promptHit, MESSAGES.promptHitError, ['y', 'Y', 'N', 'n']);
      if (wantToHit === 'y' || wantToHit === 'Y') {
        player.pushCards(deck.deal(1));
      } else {
        GV.playerTurnOver = true;
      }
    },

    playOneHand: function () {
      console.log(MESSAGES.playNextHand);
      readline.question();

      init.game();
      display.displayState();

      while (!GV.playerTurnOver && !GV.gameOver) {
        this.playerTakeTurn();
        display.displayState();
        this.checkForWin();
      }

      if (!GV.gameOver) {
        this.dealerTakeTurn();
        this.checkForWin();
      }
      this.checkForWin();
      display.displayState();
      display.displayHandOver();
      GV.handsPlayed += 1;
    }
  };

  //PUBLIC METHODS
  this.play = function () {
    init.playerInfo();

    while (true) {
      init.match();

      while (GV.handsPlayed < GV.numberOfHands) {
        gameLogic.playOneHand();
      }

      if (!display.displayFinalState()) break;
    }
  };
}

let game = new GameObject();
game.play();
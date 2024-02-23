const util = require('./utilities.js');
const readline = require('readline-sync');
const WINNING_VALUE = 21;

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
  })
}

//_________________________________________________________________________________________________________________________________________
//DECK 
function Deck() {
  const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
  const deck = [];

  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      const card = new Card(suit, value);
      deck.push(card);
    })
  })
  shuffleDeck();

  //PRIVATE METHODS
  //CHECK
  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  //PUBLIC METHODS
  //CHECK
  this.deal = function (numberOfCards) {
    let cards = [];
    for (let cardsDealt = 0; cardsDealt < numberOfCards; cardsDealt++) {
      cards.push(deck.pop());
    }
    return cards;
  }

}

//_________________________________________________________________________________________________________________________________________
function Player() {
  this.name = undefined;
  this.score = 0;
  const cards = [];

  //PUBLIC METHODS
  Object.defineProperty(this, 'cards', {
    get: function () {
      return cards;
    }
  })

  this.pushCards = function (dealt) {
    dealt.forEach(card => {
      cards.push(card);
    })
  }

  this.newHand = function () {
    while (cards.length) {
      cards.pop();
    }
  }

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
  }
}

//_________________________________________________________________________________________________________________________________________

function GameObject() {
  const deck = new Deck();
  const player = new Player();
  const dealer = new Player();
  let playerTurnOver = false;
  let dealerTurnOver = false;
  gameStarted = false;
  let gameOver = false;
  let numberOfHands;
  let handsPlayed = 0;

  //PRIVATE METHODS
  function initGame() {
    //clear old hand
    player.newHand();
    dealer.newHand();
    //deal 2 cards to player & dealer
    player.pushCards(deck.deal(2));
    dealer.pushCards(deck.deal(2));
    playerTurnOver = false;
    dealerTurnOver = false;
    gameStarted = true;
    gameOver = false;
  }


  function displayState() {

    function padToTarget(word, target = 8, display = true) {
      let padFront = Math.ceil((target - word.length) / 2);
      let padBack = Math.floor((target - word.length) / 2);

      if (display) {
        return `${' '.repeat(padFront)}${word}${' '.repeat(padBack)}`;
      }
      return `${' '.repeat(target)}`;
    }

    function returnOf(card, display = true) {
      if (card && display) {
        return padToTarget('OF',)
      } else if (card) {
        return " HIDDEN ";
      }
      return padToTarget('', 8, false)
    }

    function returnSuit(card, display = true) {
      if (card && display) {
        return padToTarget(`${card.suit}`)
      }
      return padToTarget('', 8, false)
    }

    function returnValue(card, display = true) {
      if (card && display) {
        return padToTarget(`${card.value}`)
      }
      return padToTarget('', 8, false)
    }

    function returnScore(player, display = true) {
      if (display) {
        return padToTarget(String(player.calcHandValue()), 62, display);
      }
      return padToTarget('HIDDEN', 62, true)

    }
    let roundsPlayed = padToTarget(`PLAYING ROUND: ${handsPlayed + 1} of ${numberOfHands}`, 36, true);
    console.clear();
    console.log(
      `  _____________________________________________________________________________________________________________________________\n`,
      `|${padToTarget(player.name ? `${player.name.toUpperCase()}'S CARDS:` : 'PLAYER\'S CARDS:', 43, true)}|${gameStarted ? roundsPlayed : ' '.repeat(36)}|${padToTarget('DEALER\'S CARDS:', 44, true)}|\n`,
      `|___________________________________________|____________________________________|____________________________________________|\n`,
      `|   ________    ________    ________    ________    ________   |   ________    ________    ________    ________    ________   |\n`,
      `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
      `|  |${returnValue(player.cards[0])}|  |${returnValue(player.cards[1])}|  |${returnValue(player.cards[2])}|  |${returnValue(player.cards[3])}|  |${returnValue(player.cards[4])}|\
  |  |${returnValue(dealer.cards[0])}|  |${returnValue(dealer.cards[1], gameOver)}|  |${returnValue(dealer.cards[2], gameOver)}|  |${returnValue(dealer.cards[3], gameOver)}|  |${returnValue(dealer.cards[4], gameOver)}|  |\n`,
      `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
      `|  |${returnOf(player.cards[0])}|  |${returnOf(player.cards[1])}|  |${returnOf(player.cards[2])}|  |${returnOf(player.cards[3])}|  |${returnOf(player.cards[4])}|\
  |  |${returnOf(dealer.cards[0])}|  |${returnOf(dealer.cards[1], gameOver)}|  |${returnOf(dealer.cards[2], gameOver)}|  |${returnOf(dealer.cards[3], gameOver)}|  |${returnOf(dealer.cards[4], gameOver)}|  |\n`,
      `|  |        |  |        |  |        |  |        |  |        |  |  |        |  |        |  |        |  |        |  |        |  |\n`,
      `|  |${returnSuit(player.cards[0])}|  |${returnSuit(player.cards[1])}|  |${returnSuit(player.cards[2])}|  |${returnSuit(player.cards[3])}|  |${returnSuit(player.cards[4])}|\
  |  |${returnSuit(dealer.cards[0])}|  |${returnSuit(dealer.cards[1], gameOver)}|  |${returnSuit(dealer.cards[2], gameOver)}|  |${returnSuit(dealer.cards[3], gameOver)}|  |${returnSuit(dealer.cards[4], gameOver)}|  |\n`,
      `|  |________|  |________|  |________|  |________|  |________|  |  |________|  |________|  |________|  |________|  |________|  |\n`,
      `|______________________________________________________________|______________________________________________________________|\n`,
      `|${padToTarget(player.name ? `${player.name.toUpperCase()}'S SCORE:` : 'PLAYER\'S SCORE:', 62, true)}|${padToTarget('DEALER\'S SCORE:', 62, true)}|\n`,
      `|______________________________________________________________|______________________________________________________________|\n`,
      `|                                                              |                                                              |\n`,
      `|${returnScore(player)}|${returnScore(dealer, gameOver)}|\n`,
      `|______________________________________________________________|______________________________________________________________|\n`,
    );

  }

  function checkForWin() {
    const dealerScore = dealer.calcHandValue();
    const playerScore = player.calcHandValue();

    if (dealerScore > 21) {
      gameOver = true;
      return 'player';
    }

    if (playerScore > 21) {
      gameOver = true;
      return 'dealer';
    }

    if (dealerTurnOver) {
      gameOver = true;
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
  }

  function dealerTakeTurn() {
    while (dealer.calcHandValue() < 17) {
      dealer.pushCards(deck.deal(1));
    }
    dealerTurnOver = true;
  }

  function playerTakeTurn() {
    let wantToHit = util.getValidInput('Would you like to hit? (y/n)', 'Hmmm. That does not seem like a valid option. \n Please press y for yes or n for no', ['y', 'n'])
    if (wantToHit === 'y') {
      player.pushCards(deck.deal(1));
    } else {
      playerTurnOver = true;
    }
  }

  function displayGameOver() {
    const winner = checkForWin();
    if (winner === 'player') {
      console.log('YOU WIN!!!');
      player.score += 1;
    } else if (winner === 'dealer') {
      console.log('THE DEALER WINS!!!');
      dealer.score += 1;
    } else {
      console.log(`IT'S A TIE!`);
    }
    console.log(`THE SCORE IS: \nDEALER: ${dealer.score} GAMES \n${player.name}: ${player.score} GAMES`)
  }
  function displayFinalState() {
    //TODO
    console.log('goodbye');
  }

  //PUBLIC METHODS
  this.play = function () {
    displayState();
    console.log('Welcome to 21! Please enter your name.')
    player.name = readline.question().toUpperCase();
    displayState();
    console.log('How many hands would you like to play today?')
    numberOfHands = readline.question();

    console.log(`Great! Lets play ${numberOfHands} hands together!`);

    while (handsPlayed < numberOfHands) {
      console.log('Press any key to start/play next round...');
      readline.question();

      initGame();
      displayState();

      while (!playerTurnOver && !gameOver) {
        playerTakeTurn();
        displayState()
        checkForWin();
      }

      if (!gameOver) {
        dealerTakeTurn();
        checkForWin();
      }
      checkForWin();
      displayState();
      displayGameOver();
      handsPlayed += 1;
    }
    displayFinalState();
  }
}

let game = new GameObject();
game.play();

//TODO: IMPLEMENT FINAL GAMEOVER OUTPUT
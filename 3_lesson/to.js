const util = require('./utilities.js');
//const MESSAGES = require('./twentyOne_messages.json');
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const WINNING_VALUE = 21;

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

function displayGameObject(cardsInPlay, deck) {
  const player = {
    cards: cardsInPlay.player,
  }

  const dealer = {
    cards: cardsInPlay.dealer,
  }

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

  function returnScore(cards, display = true) {
    if (display) {
      return padToTarget(String(calcHandValue(cards)), 62, display);
    }
    return padToTarget('HIDDEN', 62, true)

  }

  const gameOver = false;
  console.clear();
  console.log(
    `  _____________________________________________________________________________________________________________________________\n`,
    `|                         PLAYER CARDS:                        |                         DEALER CARDS:                        |\n`,
    `|______________________________________________________________|______________________________________________________________|\n`,
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
    `|                         PLAYER SCORE:                        |                         DEALER SCORE:                        |\n`,
    `|______________________________________________________________|______________________________________________________________|\n`,
    `|                                                              |                                                              |\n`,
    `|${returnScore(player.cards)}|${returnScore(dealer.cards, gameOver)}|\n`,
    `|______________________________________________________________|______________________________________________________________|\n`,
  );

}


function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function generateDeck() {
  let deck = [];
  SUITS.forEach(suit => {
    VALUES.forEach(value => {
      let card = {
        suit: suit,
        value: value,
      };
      deck.push(card);
    })
  })
  shuffleDeck(deck);
  return deck;
}

function deal(deck, numberCards) {
  let cards = [];
  for (let cardsDealt = 0; cardsDealt < numberCards; cardsDealt++) {
    cards.push(deck.pop());
  }
  return cards;
}

function displayBoard(cardsInPlay, gameOver = false) {
  //console.clear();
  let playerCards = cardsInPlay.player.map(card => {
    return `The ${card.value} of ${card.suit}`;
  })

  let dealerCards = cardsInPlay.dealer.map(card => {
    return `The ${card.value} of ${card.suit}`;
  })

  if (gameOver) {
    console.log(`The final outcome is: \n 
   DEALER SCORE: ${calcHandValue(cardsInPlay.dealer)} \n
   DEALER CARDS: The dealers cards are ${joinOr(dealerCards, ', ', 'and')} \n
   PLAYER SCORE: ${calcHandValue(cardsInPlay.player)} \n
   PLAYER CARDS: The players cards are ${joinOr(playerCards, ', ', 'and')}
   `)
    return;
  }

  console.log(`Your cards are ${joinOr(playerCards, ', ', 'and')}`)
  console.log(`The value of your current hand is: ${calcHandValue(cardsInPlay.player)}`);
  if (calcHandValue(playerCards) > 21) return;
  console.log(`The dealers card is ${dealerCards[0]}`);
}

function playerTurn(cardsInPlay, deck) {
  while (calcHandValue(cardsInPlay.player) < 21) {
    displayBoard(cardsInPlay);

    let wantToHit = util.getValidInput('Would you like to hit?', '', ['y', 'n'])
    if (wantToHit === 'y') {
      hit(cardsInPlay, deck, 'player');
    } else {
      break;
    }
  }
}

function hit(cardsInPlay, deck, player) {
  console.clear();
  if (player === 'player') {
    let newCard = deck.pop();
    console.log(`Your new card is ${newCard.value} of ${newCard.suit}`)
    cardsInPlay.player.push(newCard);
  } else if (player === 'dealer') {
    let newCard = deck.pop();
    console.log(`The dealers new card is ${newCard.value} of ${newCard.suit}`)
    cardsInPlay.dealer.push(newCard);
  }
}

function cardValue(card) {
  if (typeof card.value === 'number') {
    return card.value;
  }
  return 10;
}

function calcHandValue(cards) {
  let aces = cards.filter(card => card.value === 'Ace');
  let notAces = cards.filter(card => card.value !== 'Ace');

  let handValue = notAces.reduce((acc, card) => {
    return acc + cardValue(card);
  }, 0);

  while (aces.length > 0) {
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


function checkForWin(cardsInPlay, playOver = false) {
  const playerScore = calcHandValue(cardsInPlay.player);
  const dealerScore = calcHandValue(cardsInPlay.dealer);

  if (dealerScore > 21) {
    displayBoard(cardsInPlay, true);
    console.log('The player won!')
    return 'player';
  }

  if (playerScore > 21) {
    displayBoard(cardsInPlay, true);
    console.log('The dealer won!')
    return 'dealer';
  }

  if (playOver) {
    displayBoard(cardsInPlay, true);

    if (dealerScore > playerScore) {
      console.log('The dealer won!')
      return 'dealer';
    }
    if (playerScore === dealerScore) {
      console.log('Its a tie!')
      return false;
    } else {
      console.log('You win!');
      return 'player';
    }
  }
  return false;
}

function dealerTurn(cardsInPlay, deck) {
  while (calcHandValue(cardsInPlay.dealer) < 17) {
    hit(cardsInPlay, deck, 'dealer');
  }
}


function play21() {
  // while (true) {
  console.clear();
  let deck = generateDeck();

  let cardsInPlay = {
    dealer: deal(deck, 2),
    player: deal(deck, 2),
  }
  displayGameObject(cardsInPlay);

  playerTurn(cardsInPlay, deck);
  checkForWin(cardsInPlay)

  dealerTurn(cardsInPlay, deck);
  checkForWin(cardsInPlay, true);


  //let playAgain = util.getValidInput('Play again (y/n)', ' ', ['y', 'n'])
  //if (playAgain === 'n') break;
  //}
}

play21();
// This project was about creating a War card game.
//We had to create classes such as Card, Deck, and Player.
//The project will deal 26 cards to 2 players from a deck.
//It will award a point to the player with the higher card.
//Ties will award zero points for both players.
//After all of the cards have been played, it will display the score and declare a winner.
//One function will be tested using Mocha and Chai.

//I began by creating arrays for Suits and Values, and an array for each players points.
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const VALUES = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const playerOnePoints = [];
const playerTwoPoints = [];
let playerSum = 0;
let playerOneDeck, playerTwoDeck;
//Now I set the values of the cards
const cardValue = {
    'K': 13,
    'Q': 12,
    'J': 11,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'A': 1
};

//Now I'll make a class called Deck to make a new deck of cards.
class Deck {
    constructor(cards = newDeck()) {
        this.cards = cards;
    }

    get cardsInDeck() {
        return this.cards.length;
    }
    //Pop function will remove the top card and compare it to the other players card.
    pop() {
        return this.cards.shift;
    }
    ////I'm creating a function to shuffle a deck of 52 cards.
    deckShuffle() {
        for (let i = this.cardsInDeck - 1; i > 0; i--) {
            const cardIndex = Math.floor(Math.random() * (i + 1));
            const oldCardIndex = this.cards[cardIndex];
            this.cards[cardIndex] = this.cards[i];
            this.cards[i] = oldCardIndex;
        }
    }
}

////Now I created a function to take the shuffled cards and create a new deck.
function newDeck() {
    return SUITS.flatMap(suits => {
        return VALUES.map(values => {
            return new Card(suits, values)
        });
    });
}
//I next created a function to take the points array and add them up for a final score.
//This function was tested with Mocha and Chai.
function averageArray(array1) {
    playerSum = array1.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    }); if (typeof array1 === String || typeof array1 === Boolean) {
        throw new Error('Array1 must be a number');
    }
    return playerSum; 
};



//Now I created my class called Card.
class Card {
    constructor(suits, values) {
        this.suits = suits;
        this.values = values;
    }
}

//Now I will declare a function to shuffle a deck.
const deck = new Deck();
deck.deckShuffle();
//This next part will split the shuffled deck between 2 players.
const halfDeck = Math.ceil(deck.cardsInDeck / 2);
playerOneDeck = (deck.cards.slice(0, halfDeck));
playerTwoDeck = (deck.cards.slice(halfDeck, deck.cardsInDeck));

//I created an add function to add 1 point per game won.
//I also created a loop that takes the two shuffled half decks, and compares the numbers and values of each card.
//By calling the pop function, it iterates. The loop also assigns each player half of the deck.
function add(value) {
    points += value;
    if (value == 1) {
        points = 1;
    }
}

let points = 1
for (let i = 0; i < 26; i++) {
    const playerOneCard = playerOneDeck.pop();
    const playerTwoCard = playerTwoDeck.pop();
    console.log(`
    Round ${i} Start
    Player One's Card: ${cardValue[playerOneCard.values]}`);
    console.log(`
    Player Two's Card: ${cardValue[playerTwoCard.values]}
    Round ${i} End
    `);
    if (cardValue[playerOneCard.values] > cardValue[playerTwoCard.values]) {
        playerOnePoints.push(points);
        console.log('Player One Wins');
    } else if (cardValue[playerTwoCard.values] > cardValue[playerOneCard.values]) {
        playerTwoPoints.push(points);
        console.log('Player Two Wins');
    } else {
        console.log('Draw, No Points Awarded');
    }
};

//I created a final score board using console.log and template literals.
console.log(`FINAL SCORE
Player One's Total: ${averageArray(playerOnePoints)}
Player Two's Total: ${averageArray(playerTwoPoints)}`);

//Lastly, I created a loop to show which player won the game overall after seeing the final score.
//Used console.log and template literals to declare who won.
let playerOneTotalSum = averageArray(playerOnePoints);
let playerTwoTotalSum = averageArray(playerTwoPoints);
if (playerOneTotalSum > playerTwoTotalSum) {
    console.log(` End Game
    Player One is the WINNER with ${playerOneTotalSum} Points!!`);
} else if (playerTwoTotalSum > playerOneTotalSum) {
    console.log(` End Game
    Player Two is the WINNER with ${playerTwoTotalSum} Points!!`);
} else {
    console.log(`The Game Ended in a Draw!!`);
}
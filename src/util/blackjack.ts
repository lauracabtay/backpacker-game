const blackjackValues = {
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'10': 10,
	'J': 10,
	'Q': 10,
	'K': 10,
	'A': 11,
}
const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
const ranks = Object.keys(blackjackValues);

export function deck() {
	const deck: string[] = [];
	for(let suitCounter = 0; suitCounter < 4; suitCounter++) { 
		for(let rankCounter = 0; rankCounter < 13; rankCounter++) {
		deck.push(`${ranks[rankCounter]} ${suits[suitCounter]}`);
		};
	};
	return deck;
}

export function drawRandomCard(myDeck) {
	let card = myDeck[Math.floor(Math.random() * myDeck.length)];
	return card;
}

export function scoreHand(playerHand) {
	let score = 0;
	for(const card of playerHand) {
		const cardRank = card.split(" ").shift();
		const cardValue = blackjackValues[cardRank];
		score += cardValue;
	};
	return score;
}	

export function getDealerScore() {
	return Math.floor(Math.random() * (21 - 16 + 1)) + 16;
}

export function removeCardFromDeck(card, deck) {
	const index = deck.indexOf(card);
	const newDeck = deck.splice(index, 1); 
	return newDeck;
}
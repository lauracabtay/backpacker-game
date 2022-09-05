import {deck, scoreHand, drawRandomCard, getDealerScore, removeCardFromDeck } from "../src/util/blackjack";
import {expect} from '@jest/globals'

describe("Blackjack", () => {

	describe("deck function", () => {
		it("creates a 52 card deck", () => {
			expect(deck()).toEqual([
        '2 Hearts',    '3 Hearts',   '4 Hearts',
        '5 Hearts',   '6 Hearts',    '7 Hearts',   '8 Hearts',
        '9 Hearts',   '10 Hearts',   'J Hearts',   'Q Hearts',
        'K Hearts',   'A Hearts',   '2 Clubs',
        '3 Clubs',    '4 Clubs',     '5 Clubs',    '6 Clubs',
        '7 Clubs',    '8 Clubs',     '9 Clubs',    '10 Clubs',
        'J Clubs',    'Q Clubs',     'K Clubs',    'A Clubs',
      	'2 Diamonds',  '3 Diamonds', '4 Diamonds',
        '5 Diamonds', '6 Diamonds',  '7 Diamonds', '8 Diamonds',
        '9 Diamonds', '10 Diamonds', 'J Diamonds', 'Q Diamonds',
        'K Diamonds', 'A Diamonds',  '2 Spades',
        '3 Spades',   '4 Spades',    '5 Spades',   '6 Spades',
        '7 Spades',   '8 Spades',    '9 Spades',   '10 Spades',
        'J Spades',   'Q Spades',    'K Spades',   'A Spades'
      ]);
		});
	});

	describe("scoreHand function", () => {
		it("takes a players hand and returns total card value", () => {
			const playerHand = ['2 Diamonds', 'K Clubs', '3 Spades'];
			expect(scoreHand(playerHand)).toEqual(15);
		});

		it("takes a players hand and returns total card value", () => {
			const playerHand = ['K Spades', 'K Clubs'];
			expect(scoreHand(playerHand)).toEqual(20);
		});
	});

	describe("getDealerScore function", () => {
		it("returns the dealers total score", () => {
			expect(getDealerScore()).toBeGreaterThan(15);
			expect(getDealerScore()).toBeLessThan(22);
		});
	});

	describe("drawRandomCard function", () => {
		it("returns a single card from the deck", () => {
			const myDeck = deck();
			expect(drawRandomCard(myDeck)).not.toBe(null);
			expect(['Spades', 'Clubs', 'Hearts', 'Diamonds']).toContain(drawRandomCard(myDeck).split(" ").pop())
		});
	});

	describe("removeCardFromDeck function", () => {
		it("removes a card from the current deck", () => {
			let myDeck = deck();
			let card = drawRandomCard(myDeck);
			removeCardFromDeck(card, myDeck);
			expect(myDeck).not.toContainEqual(card);
		});
	});
});

		
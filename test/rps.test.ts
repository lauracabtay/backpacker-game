import {findWinner} from "../src/util/rps";
import {expect} from '@jest/globals'

describe("Rock-Paper-Scissors find winner function", () => {
	describe("Find winner function", () => {
		it("correctly shows when player 1 wins", () => {
			expect(findWinner("ROCK", "SCISSORS")).toBe(1);
			expect(findWinner("PAPER", "ROCK")).toBe(1);
			expect(findWinner("SCISSORS", "PAPER")).toBe(1);
		});

		it("correctly shows when player 2 wins", () => {
			expect(findWinner("ROCK", "PAPER")).toBe(2);
			expect(findWinner("PAPER", "SCISSORS")).toBe(2);
			expect(findWinner("SCISSORS", "ROCK")).toBe(2);
		});

		it("correctly shows when there's a draw", () => {
			expect(findWinner("ROCK", "ROCK")).toBe(0);
			expect(findWinner("PAPER", "PAPER")).toBe(0);
			expect(findWinner("SCISSORS", "SCISSORS")).toBe(0);
		});

		it("fails when given something that's not a move", () => {
			// @ts-ignore
			expect(() => findWinner("ROCK", "CHEESE")).toThrow();
		});
	});
});

import {describe, it, expect} from "@jest/globals";
import {boardIsFull, emptySpaces, findWinner} from '../src/util/tic-tac-toe.js'

describe('Tic-Tac-Toe', () => {
	describe('Find winner function', () => {
		it('identifies the winner for horizontal lines', () => {
			expect(findWinner([
				[null, null, null],
				[true, null, false],
				[true, true, true]
			])).toBe(true)
			expect(findWinner([
				[false, false, false],
				[true, null, false],
				[true, null, true]
			])).toBe(false)
			expect(findWinner([
				[null, null, null],
				[true, true, true],
				[null, null, null]
			])).toBe(true)
		})

		it('identifies the winner for vertical lines', () => {
			expect(findWinner([
				[true, null, null],
				[true, null, false],
				[true, false, true]
			])).toBe(true)
			expect(findWinner([
				[true, false, false],
				[null, false, false],
				[true, false, true]
			])).toBe(false)
			expect(findWinner([
				[null, null, true],
				[null, null, true],
				[null, null, true]
			])).toBe(true)
		})

		it('identifies the winner for diagonal lines', () => {
			expect(findWinner([
				[true, null, null],
				[null, true, false],
				[true, false, true]
			])).toBe(true)
			expect(findWinner([
				[true, false, false],
				[null, false, false],
				[false, null, true]
			])).toBe(false)
		})

		it('returns null when there is no winner', () => {
			expect(findWinner([
				[false, true, true],
				[true, true, false],
				[false, false, true]
			])).toBeNull()

			expect(findWinner([
				[null, null, null],
				[null, null, null],
				[null, null, null]
			])).toBeNull()
		})
	})

	describe('Board is full function', () => {
		it('identifies a full board', () => {
			expect(boardIsFull([
				[true, false, true],
				[false, false, false],
				[false, false, true]
			])).toBeTruthy()
		})
		it('identifies a full board', () => {
			expect(boardIsFull([
				[null, false, true],
				[false, null, false],
				[false, false, null]
			])).toBeFalsy()
		})
	})

	it('Empty spaces finder finds empty spaces', () => {
		expect(Array.from(emptySpaces([
				[null, true, false],
				[true, null, null],
				[null, true, false]
			]
		)).length).toBe(4)
	})
})

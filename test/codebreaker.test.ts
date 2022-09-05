import {getRandomArray, countCorrectlyPlaced, countIncorrectlyPlaced} from "../src/util/codebreaker";
import {expect} from '@jest/globals'

describe("codebreaker random array function", () => {
	describe("getRandomArray function", () => {
		it("generates an array of strings with 4 elements", () => {
            const result = getRandomArray()
			expect(result.length).toBe(4);
            expect(typeof result[0]).toEqual('string')
            expect(typeof result[1]).toEqual('string')
            expect(typeof result[2]).toEqual('string')
            expect(typeof result[3]).toEqual('string')
		});
    });

    describe("count correctly placed function", () => {
        it("count digits that are correctly placed", () => {
            expect(countCorrectlyPlaced('1234', '1534')).toBe(3)
            expect(countCorrectlyPlaced('5436', '5098')).toBe(1)
            expect(countCorrectlyPlaced('6532', '6532')).toBe(4)
            expect(countCorrectlyPlaced('1234', '5678')).toBe(0)
        })
    });

    describe("count incorrectly placed function", () => {
        it("count digits that are not correctly placed", () => {
            expect(countIncorrectlyPlaced('3214', '1267')).toBe(1)
            expect(countIncorrectlyPlaced('9456', '5098')).toBe(2)
            expect(countIncorrectlyPlaced('6532', '6532')).toBe(0)
            expect(countIncorrectlyPlaced('1234', '5678')).toBe(0)
            expect(countIncorrectlyPlaced('4321', '1234')).toBe(4)
        })
    })
});

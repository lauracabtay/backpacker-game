export const NUMBER_OF_GUESSES = 10;
export const COMPUTER_ARRAY_LENGTH = 4;

// generate an array of 4 numbers
export function getRandomArray(): string {
    const computerArray: string[] = []
    const arrayOfNums: string[] = '0123456789'.split('');
    for (let i = arrayOfNums.length ; computerArray.length < 4 ; i--) {
        let j = Math.floor(Math.random() * (i));
        computerArray.push(arrayOfNums[j]);
        arrayOfNums.splice(j,1);
    }
    // PLEASE LEAVE CONSOLE LOG BELOW FOR DEMO
    console.log(computerArray);
    return computerArray.join('');
}


/**
 * Given two arrays, find if userGuess is same as computerArray.
 * @return count of correctly placed digits
 */
export function countCorrectlyPlaced(
    userGuess: string,
    computerArray: string
): number {
    let correctlyPlaced: number = 0;
    if (userGuess.length != 4)
        throw new Error("Invalid move");
    for (let i = 0 ; i < computerArray.length ; i++) {
        if (computerArray[i] == userGuess[i]) {
            correctlyPlaced += 1
        }
    }
    return correctlyPlaced;
}

/**
 * Given two arrays, find if any userGuess input is in computerArray at a different index.
 * @return count of incorrectly placed digits
 */
export function countIncorrectlyPlaced(
    userGuess: string,
    computerArray: string
): number {
    let incorrectlyPlaced: number = 0;
    if (userGuess.length != 4)
        throw new Error("Invalid move");
    for (let i = 0 ; i < userGuess.length ; i++) {
        for (let j = 0 ; j < userGuess.length ; j++) {
            if (computerArray[i] == userGuess[j] && i != j) {
                incorrectlyPlaced += 1
            }
        }
    }
    return incorrectlyPlaced;
}
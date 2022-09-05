// Click fairy in forest, redirect to higherlower game page with story and minigame as below.
// Given a random number/card between 1-10 or ace(1) to king(13)
// buttons for higher and lower
// user clicks higher or lower -> reload the page with new number/card added to array
// logic = when button is pressed, random number is generated and added to an array, this number is checked against the previous number in the array
// if guessed correctly higher or lower buttons will appear again and array is displayed in some way to show all numbers played so far
// if user guess correctly 5 times ie there are 6 cards in the array or loses through incorrect guess redirected to results page with if statement story
// and option to go to forest or play again.
// On a result, result is pushed into gameResults on db.
// On a win result, spade item added to backpack (included in winning stor, pushed into db)


export function getRandomNumber() {
    let randNum = Math.floor(Math.random() * 13) + 1;
    if(randNum > 13) {
        return 13; 
    } else {
        return randNum;
    }
}

export function compareNumbers(currentNum, newNum) {
    return newNum > currentNum ? "Higher" : (newNum === currentNum ? "Draw" : "Lower");
}

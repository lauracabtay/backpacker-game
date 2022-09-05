export type RockPaperScissorsMove = "ROCK" | "PAPER" | "SCISSORS";
export const ALLOWED_MOVES: RockPaperScissorsMove[] = [
  "ROCK",
  "PAPER",
  "SCISSORS",
];

const winningMoves = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK",
};

/**
 * Given two moves, find the winner.
 * @return 1 if player 1 wins, 2 if player 2 wins, 0 if it's a draw
 */
export function findWinner(
  move1: RockPaperScissorsMove,
  move2: RockPaperScissorsMove
): 0 | 1 | 2 {
  if (!ALLOWED_MOVES.includes(move1) || !ALLOWED_MOVES.includes(move2))
    throw new Error("Invalid move");
  if (move1 == move2) return 0;
  return winningMoves[move1] === move2 ? 2 : 1;
}

/**
 * @return a random move
 */
export function randomMove() {
  return ALLOWED_MOVES[Math.floor(Math.random() * ALLOWED_MOVES.length)];
}

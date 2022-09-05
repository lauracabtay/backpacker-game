type TicTacToeElement = boolean | null
type TicTacToeRow = [TicTacToeElement, TicTacToeElement, TicTacToeElement]
export type TicTacToeBoard = [TicTacToeRow, TicTacToeRow, TicTacToeRow]

/**
 * A 2d 3x3 array representing a tic-tac-toe board.
 * True indicates a player move
 * False indicates a computer move
 * null indicates an empty space
 */
export const DEFAULT_BOARD: TicTacToeBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
]

function compareRow(one: TicTacToeElement, two: TicTacToeElement, three: TicTacToeElement) {
	return one !== null && one === two && two === three;
}

export function findWinner(board: TicTacToeBoard): TicTacToeElement {
	// rows
	for (const row of board) {
		if (compareRow(...row)) return row[0]
	}
	// columns
	for (const col of [0, 1, 2]) {
		if (compareRow(board[0][col], board[1][col], board[2][col])) return board[0][col]
	}
	// diagonals
	if (compareRow(board[0][0], board[1][1], board[2][2])) return board[0][0]
	if (compareRow(board[0][2], board[1][1], board[2][0])) return board[0][2]

	return null
}

export function* emptySpaces(board: TicTacToeBoard) {
	for (const [rowIdx, row] of board.entries()) {
		for (const [elIdx, element] of row.entries()) {
			if (element === null) yield [rowIdx, elIdx]
		}
	}
}

export function boardIsFull(board: TicTacToeBoard) {
	return !board.some(row => row.some(it => it === null))
}

import mongoose from 'mongoose'
import {ObjectId, WithId} from 'mongodb'

export enum BackpackItem {
	ROCK = "ROCK",
	STICK = "STICK",
	COMPASS = "COMPASS",
	WATER = "WATER",
	WOOLY_HAT = "WOOLY_HAT",
	SAUCEPAN = "SAUCEPAN",
	TOADSTOOL = "TOADSTOOL",
	MATCHES = "MATCHES",
	DIAMOND_DUST = "DIAMOND_DUST",
	COOKIE = "COOKIE",
	MILK = "MILK",
	SPADE = "SPADE"
}

export interface Game {
	user: ObjectId
	backpack: BackpackItem[],
	lostItem: string,
	gameResults: {
		[game: string]: 'WIN' | 'LOSE' | 'DRAW'
	}
}

const gameModel = mongoose.model('game', new mongoose.Schema<Game>({
	user: ObjectId,
	lostItem: String,
	backpack: {
		type: [String],
		enum: Object.values(BackpackItem)
	},
	gameResults: {
		type: Object,
		required: true
	}
}, { minimize: false }))
export default gameModel

/**
 * Adds an item to the backpack. If the item is already in the backpack, adds another one.
 * @param id the game ID
 * @param item the item to add
 */
export async function addToBackpack(id: ObjectId, item: BackpackItem): Promise<WithId<Game>> {
	const result = await gameModel.findByIdAndUpdate(id, {
		$addToSet: {
			backpack: item
		}
	}, {new: true})
	return result!.toObject()
}

/**
 * Removes an item from the backpack. If not present, does nothing.
 * @param id the game ID
 * @param item the item to add
 */
export async function removeFromBackpack(id: ObjectId, item: BackpackItem) {
	await gameModel.findByIdAndUpdate(id, {
		$pull: {
			backpack: item
		}
	})
}

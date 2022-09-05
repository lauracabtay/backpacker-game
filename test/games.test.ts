import GameModel, {addToBackpack, BackpackItem, removeFromBackpack} from '../src/models/game.model'
import {ObjectId} from 'mongodb'
import database from './database.js'
import mongoose from 'mongoose'
import {expect} from '@jest/globals'

describe('Game model', () => {
	let gameId: ObjectId;
	beforeAll(async () => {
		await database;
		gameId = new ObjectId();
		await new GameModel({
			_id: gameId,
			user: null,
			backpack: [],
			gameResults: {}
		}).save()
	})

	it('correctly adds and removes items', async () => {
		await addToBackpack(gameId, BackpackItem.STICK);
		const model1 = await GameModel.findById(gameId)
		expect(model1?.backpack).toContain('STICK')

		await removeFromBackpack(gameId, BackpackItem.STICK);
		const model2 = await GameModel.findById(gameId)
		expect(model2?.backpack).not.toContain('STICK')
	})

	afterAll(async () => {
		await GameModel.findByIdAndDelete(gameId);
		await mongoose.disconnect()
	})
})
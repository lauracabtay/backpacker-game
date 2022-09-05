/* istanbul ignore file */
import {Router} from "express";
import UserModel, {User} from '../models/user.model.js'
import mongoose from 'mongoose'

import GameModel, {addToBackpack, BackpackItem, Game, removeFromBackpack} from '../models/game.model.js'
import {requireActiveGame} from '../util/users.js'

const router = Router();

const DEV_USER_ID = new mongoose.Types.ObjectId('0123456789ABCDEF01234567')
const DEV_GAME_ID = new mongoose.Types.ObjectId('ABCDEF0123456789ABCDEF01')

const DEFAULT_DEV_GAME: Game = {
	user: DEV_USER_ID,
	lostItem: 'TEST LOST ITEM',
	backpack: [BackpackItem.COOKIE],
	gameResults: {}
}


const DEFAULT_DEV_USER: User = {
	name: 'TestUser',
	email: 'test@user.com',
	// hash for password '12345
	password: '$2b$10$XmTjg/BBcEiSNdpbbz11euD5A7xULJWnU/5duFL6GfgbHRygAOTDy',
	currentGame: {...DEFAULT_DEV_GAME, _id: DEV_GAME_ID}
}

router.get('/', (req, res) => res.render('debug'));

/**
 * Logs the client into a new user.
 */
router.get('/login', async (req, res) => {
	await UserModel.findByIdAndUpdate(DEV_USER_ID, {
		...DEFAULT_DEV_USER,
		currentGame: DEV_GAME_ID
	}, {upsert: true})
	await GameModel.findByIdAndUpdate(DEV_GAME_ID, DEFAULT_DEV_GAME, {upsert: true})

	req.session.user = {
		...DEFAULT_DEV_USER,
		_id: DEV_GAME_ID
	}
	res.status(204).send()
})

/**
 * Adds an item to the backpack.
 */
router.get('/backpack/add/:item', requireActiveGame, async (req, res) => {
	req.session.user?.currentGame?.backpack.push(req.params.item as BackpackItem)
	await addToBackpack(req.session.user!.currentGame!._id, req.params.item as BackpackItem)
	res.status(204).send()
})

/**
 * Removes an item from the backpack.
 */
router.get('/backpack/remove/:item', requireActiveGame, async (req, res) => {
	req.session.user!.currentGame!.backpack =
		req.session.user!.currentGame!.backpack.filter(it => it !== req.params.item as BackpackItem)
	await removeFromBackpack(req.session.user!.currentGame!._id, req.params.item as BackpackItem)
	res.status(204).send()
})

export default router;

import Controller from './controller.js'
import GameModel, {BackpackItem} from '../models/game.model.js'
import UserModel from '../models/user.model.js'

const indexController: Controller = {
	index(req, res) {
		res.render('index')
	},

	start(req, res) {
		res.render('game/start');
	},

	async newGame(req, res) {
		const game = new GameModel({
			user: req.session.user!._id,
			backpack: [BackpackItem.COOKIE],
			gameResults: {},
			lostItem: req.body.lostItem
		});
		await game.save();
		req.session.user!.currentGame = game.toObject()
		await UserModel.findByIdAndUpdate(req.session.user!._id, {
			currentGame: game._id
		})
		res.redirect('/areas/town');
	}
}

export default indexController;

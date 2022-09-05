import { BackpackItem } from "../models/game.model.js";
import Controller from "./controller.js";
import { getUserItems } from "../util/inventory.js";

const areasController: Controller = {
	town(req, res) {
		const inventory = getUserItems(req);
		res.render("areas/town", { inventory });
	},

	pathway(req, res) {
		const user = req.session.user;
    const hasWonRps = user!.currentGame!.gameResults.RPS;
    const hasWonTicTacToe = user!.currentGame!.gameResults.ticTacToe;
		res.render("areas/pathway", {hasWonRps, hasWonTicTacToe})
	},

	meadow(req, res) {
    const user = req.session.user;
    const hasWonSudoku = user!.currentGame!.gameResults.sudoku;
    res.render("areas/meadow", {hasWonSudoku});
  },

  ruins(req, res) {
    res.render("areas/ruins");
  },

  forest(req, res) {
    const user = req.session.user;
    const hasWonMatchPairs = user!.currentGame!.gameResults.matchPairs;
    const hasWoolyHat = user!.currentGame!.backpack.includes(BackpackItem.WOOLY_HAT)
    res.render("areas/forest", {hasWonMatchPairs, hasWoolyHat});
  },

  mountains(req, res) {
    res.render("areas/mountains");
  },

  farm(req, res) {
    const user = req.session.user;
    const hasWonCodeBreaker = user!.currentGame!.gameResults.codebreaker;
    res.render("areas/farm", {hasWonCodeBreaker});
  },

  cavetunnel(req, res) {
    const user = req.session.user;
    const hasWonTicTacToe = user!.currentGame!.gameResults.ticTacToe;
    const hasWonMatchPairs = user!.currentGame!.gameResults.matchPairs;
    console.log(user!.currentGame!.backpack)
    const hasWoolyHat = user!.currentGame!.backpack.includes(BackpackItem.WOOLY_HAT)
    res.render("areas/cavetunnel", {hasWonTicTacToe, hasWoolyHat, hasWonMatchPairs});
  },

  bridge(req, res) {
    const user = req.session.user;
    const hasWonHangman = user!.currentGame!.gameResults.hangman;
    res.render("areas/bridge", {hasWonHangman});
  },

  swamp(req, res) {
    const user = req.session.user;
    const hasWonSudoku = user!.currentGame!.gameResults.sudoku;
    res.render("areas/swamp", {hasWonSudoku});
  },

  river(req, res) {
    const user = req.session.user;
    const hasWonCodeBreaker = user!.currentGame!.gameResults.codebreaker;
    const hasWonHangman = user!.currentGame!.gameResults.hangman;
    res.render("areas/river", {hasWonCodeBreaker, hasWonHangman});
  },


};

export default areasController;
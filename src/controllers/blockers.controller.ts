import Controller from "./controller.js";

const blockersController: Controller = {
  gnome(req, res) {
  const user = req.session.user;
  const hasWonRps = user!.currentGame!.gameResults.RPS;
  res.render("blockers/gnome", {hasWonRps});
  },

  pixie(req, res) {
    const user = req.session.user;
    const backpack = user!.currentGame!.backpack
    const hasWonMatchingPairs = user!.currentGame!.gameResults.matchingPairs;
    res.render("blockers/pixie", {hasWonMatchingPairs, backpack});
  },

  troll(req, res) {
    const user = req.session.user;
    const hasWonHangman = user!.currentGame!.gameResults.hangman;
    res.render("blockers/troll", {hasWonHangman});
  },

  farmer(req, res) {
    const user = req.session.user;
    const backpack = user!.currentGame!.backpack
    const hasWonBlackjack = user!.currentGame!.gameResults.blackjack;
    res.render("blockers/farmer", {hasWonBlackjack, backpack, user});
  },
};

export default blockersController;
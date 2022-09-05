import * as rps from "../util/rps.js";
import {RockPaperScissorsMove} from '../util/rps.js';
import { getRandomNumber, compareNumbers } from "../util/higherlower.js";
import { drawRandomCard, scoreHand, deck, getDealerScore, removeCardFromDeck } from '../util/blackjack.js'
import { getRandomArray, countCorrectlyPlaced, countIncorrectlyPlaced, NUMBER_OF_GUESSES } from '../util/codebreaker.js'
import Controller from "./controller.js";
import Game from "../models/game.model.js";
import gameModel, {addToBackpack, BackpackItem} from "../models/game.model.js";
import userModel from "../models/user.model.js";
import { includesAll } from "../util/hangman.js";
import { readFile } from "fs/promises";
import * as ticTacToe from '../util/tic-tac-toe.js'
import {emptySpaces} from '../util/tic-tac-toe.js'
import { logger } from "../util/logger.js";

const words = (await readFile("public/words.txt", {
	encoding: "utf-8",
	flag: "r",
})).split("\n");

const minigamesController: { [name: string]: Controller } = {
  rps: {
    get(req, res) {
      res.render("minigames/rps");
    },
    async post(req, res) {
      const move2 = rps.randomMove();
      const move1: string = req.body.move;
      const winner = rps.findWinner(
        move1.toUpperCase() as RockPaperScissorsMove,
        move2
      );
      const gameResult = winner == 1 ? "WIN" : "LOSE";
      await Game.findOneAndUpdate(
        { user: req.session.user!._id },
        { "gameResults.RPS": gameResult }
      );
      req.session.user!.currentGame!.gameResults.RPS = gameResult;
      if (gameResult === 'WIN') {
        req.session.user!.currentGame = await addToBackpack(req.session.user!.currentGame!._id, BackpackItem.TOADSTOOL);
      }
      res.render("minigames/rps_result", { move1, move2, winner });
    },
  },

  codebreaker: {
    get (req, res) {
      req.session.codebreaker = {
        targetCode: getRandomArray(),
        remainingGuesses: NUMBER_OF_GUESSES,
        userGuesses: [],
        guessCheck: []
      }

		  res.render('minigames/codebreaker', { game: req.session.codebreaker})
    },
    async post (req, res) {
      if (req.session.codebreaker == undefined) {
        return res.redirect('/minigames/codebreaker');
      }
      const computerCode = req.session.codebreaker.targetCode;
      const userGuess: string = req.body.input;
      req.session.codebreaker.userGuesses.unshift(userGuess)
      const correctlyPlaced = countCorrectlyPlaced(userGuess, computerCode);
      const incorrectlyPlaced = countIncorrectlyPlaced(userGuess, computerCode);
      const noMatch = 4 - correctlyPlaced - incorrectlyPlaced;
      req.session.codebreaker.guessCheck.unshift([correctlyPlaced, incorrectlyPlaced, noMatch])
      req.session.codebreaker.remainingGuesses -= 1;

      let gameResult;
      if (correctlyPlaced == 4 && req.session.codebreaker.remainingGuesses >= 1) {
        gameResult = 'WIN'
      } else if (correctlyPlaced != 4 && req.session.codebreaker.remainingGuesses == 0) {
        gameResult = 'LOSE'
      }

      await Game.findOneAndUpdate(
        { user: req.session.user!._id },
        { 'gameResults.codebreaker': gameResult}
      );

      req.session.user!.currentGame!.gameResults.codebreaker = gameResult
      if (gameResult != undefined) {
        res.render('minigames/codebreaker_result', {
        userGuess,
        gameResult,
        game: req.session.codebreaker,
        showResults: true,
        })
      } else {
        res.render('minigames/codebreaker', {
        userGuess,
        correctlyPlaced,
        incorrectlyPlaced,
        noMatch,
        game: req.session.codebreaker,
        showResults: true,
        })
      }
    }
  },
  higherlower: {
    get(req, res) {
      let currentGame = [getRandomNumber()];
      req.session.higherlower = currentGame;
      res.render("minigames/higherlower", { game: req.session.higherlower });
    },
    async post(req, res) {
      if (!req.session.higherlower)
        return res.redirect("/minigames/higherlower");

      const game = req.session.higherlower;
      const choice: string = req.body.guess;
      req.session.higherlower.push(getRandomNumber());
      const outcome = compareNumbers(
        game[game.length - 2],
        game[game.length - 1]
      );
      if (choice != outcome) {
        const gameResult = "LOSE";
        await Game.findOneAndUpdate(
          { user: req.session.user!._id },
          { "gameResults.higherlower": gameResult }
        );
        let lastCard = game[game.length - 1];
        req.session.user!.currentGame!.gameResults.higherlower = gameResult;
        res.render("minigames/higherlower_result", { gameResult, lastCard });
      } else {
        if (game.length > 5) {
          const gameResult = "WIN";
          await Game.findOneAndUpdate(
            { user: req.session.user!._id },
            { "gameResults.higherlower": gameResult }
          );
          req.session.user!.currentGame!.gameResults.higherlower = gameResult;
          req.session.user!.currentGame = await addToBackpack(req.session.user!.currentGame!._id, BackpackItem.SPADE);

          let lastCard = game[game.length - 1];
          res.render("minigames/higherlower_result", { gameResult, lastCard });
        } else {
          res.render("minigames/higherlower", {
            game: req.session.higherlower,
          });
        }
      }
    }
  },

  blackjack: {
    get (req, res) {
      const myDeck = deck();
      let playerHand = [drawRandomCard(myDeck)];
      const jacksScore = getDealerScore();
      let currentGame = {hand: playerHand, deck: myDeck, jacksScore  };

      req.session.blackjack = currentGame
		  res.render('minigames/blackjack', {playerHand: req.session.blackjack.hand})
    },

    async post(req, res) {
      if(!req.session.blackjack) return res.redirect('/minigames/blackjack');
      const game = req.session.blackjack
      const move: string = req.body.move
      if (move == "Stick") {
        const playerScore = scoreHand(game.hand);
        const playerHand = game.hand;
        const jacksScore = game.jacksScore;
        const gameResult = playerScore > 21 || playerScore < jacksScore ? 'LOSE' : 'WIN'

        await Game.findByIdAndUpdate(req.session.user!.currentGame!._id,
            { 'gameResults.blackjack': gameResult });
          req.session.user!.currentGame!.gameResults.blackjack = gameResult;
          if (gameResult === 'WIN') {
            req.session.user!.currentGame = await addToBackpack(req.session.user!.currentGame!._id, BackpackItem.WOOLY_HAT);
          }
          res.render('minigames/blackjack_result', {gameResult, playerHand, jacksScore, playerScore})
      } else {
        const playerHand = game.hand;
        const jacksScore = game.jacksScore;
        const newCard = drawRandomCard(req.session.blackjack.deck);
        playerHand.push(newCard);
        const playerScore = scoreHand(game.hand);
        const playerDeck = req.session.blackjack.deck;
        removeCardFromDeck(newCard, playerDeck);
        if(scoreHand(playerHand) > 21 ) {
          const gameResult = 'LOSE'
          await Game.findOneAndUpdate(
            { user: req.session.user!._id },
            { 'gameResults.blackjack': gameResult });
          req.session.user!.currentGame!.gameResults.blackjack = gameResult;
          res.render('minigames/blackjack_result', {gameResult, playerHand, playerScore, jacksScore})
        } else {
          res.render('minigames/blackjack', {playerHand})
        }
      }
    }
  },

  hangman: {
    async get(req, res) {
      if (!req.session?.hangman) {
        const word = words[Math.floor(Math.random() * words.length)];
        req.session["hangman"] = {
          word,
          guessedLetters: [],
          lives: Math.ceil(new Set(word.split('')).size * 1.2),
        };
				console.log(word);
      }
      res.render("minigames/hangman", { hm: req.session.hangman });
    },

    post(req, res) {
      if (!req.session?.hangman) {
        res.redirect("/minigames/hangman");
        return;
      }

      req.session.hangman.guessedLetters.push(req.body.letter.toLowerCase());

      if (!req.session.hangman.word
              .split("")
              .includes(req.body.letter.toLowerCase())) {
        req.session.hangman.lives--;
      }

      if (req.session.hangman.lives <= 0) {
        res.redirect(`/minigames/hangman/results`);
        return;
      }

      if (includesAll(
              req.session.hangman.word,
              req.session.hangman.guessedLetters)
      ) {
        res.redirect(`/minigames/hangman/results`);
        return;
      }

      res.redirect("/minigames/hangman");
    },

    async result(req, res) {
      if (!req.session?.hangman) {
        res.redirect("/minigames/hangman");
        return;
      }
      let gameResult;
      gameResult = req.session.hangman.lives <= 0 ? 'LOSE' : gameResult = 'WIN';

      await Game.findOneAndUpdate(
        { user: req.session.user!._id },
        { 'gameResults.hangman': gameResult} 
      );

      req.session.user!.currentGame!.gameResults.hangman = gameResult
      res.render("minigames/hangman_result", { hm: req.session.hangman });
      delete req.session.hangman;
    },
  },

  ticTacToe: {
		get(req, res) {
			req.session.tictactoe = ticTacToe.DEFAULT_BOARD
			res.render('minigames/tictactoe', {board: req.session.tictactoe, enableMove: true})
		},
		async post(req, res) {
			// in js, assignment operators return the assigned value
			// so we can use it to set fallbacks
			const board = req.session.tictactoe ?? (req.session.tictactoe = ticTacToe.DEFAULT_BOARD)
			res.locals.board = board;

			const move = req.body.move.split(',').map(i => parseInt(i))

			// noinspection BadExpressionStatementJS
			board[move[0]][move[1]] ?? (board[move[0]][move[1]] = true)

			if (!ticTacToe.boardIsFull(board)) {
				const availableSpaces = Array.from(emptySpaces(board));
				const space = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
				board[space[0]][space[1]] = false
			}

			const winner = ticTacToe.findWinner(board)
			if (winner !== null || ticTacToe.boardIsFull(board)) {
				const result = winner === true ? 'WIN' : 'LOSE';
				await Game.findOneAndUpdate(
					{user: req.session.user!._id},
					{'gameResults.ticTacToe': result});
				req.session.user!.currentGame!.gameResults.ticTacToe = result;
        if (result === 'WIN') {
          req.session.user!.currentGame = await addToBackpack(req.session.user!.currentGame!._id, BackpackItem.DIAMOND_DUST);
        }
				return res.render('minigames/tictactoe', {winner})
			}
			// render template
			res.render('minigames/tictactoe', {enableMove: true})
		}
	},

  matchpairs: {
    get (req, res) {
      res.render('minigames/matchpairs')
    },

    async result(req, res) {
      logger.info(JSON.stringify(req.query));
      const gameResult = typeof req.query.win == 'string' ? 'WIN' : 'LOSE';
      await Game.findOneAndUpdate(
        {user: req.session.user!._id},
        {'gameResults.matchPairs': gameResult}); 
      req.session.user!.currentGame!.gameResults.matchPairs = gameResult;
      if (gameResult === 'WIN') req.session.user!.currentGame = await addToBackpack(req.session.user!.currentGame!._id, BackpackItem.COMPASS)
      res.render('minigames/matchpairs_result', {gameResult})
    }
  }
}

export default minigamesController;

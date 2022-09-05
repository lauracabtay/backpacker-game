import {Router} from 'express'
import minigamesController from '../controllers/minigames.controller.js';

const router = Router();

router.get('/rps', minigamesController.rps.get);
router.post('/rps', minigamesController.rps.post);
router.get('/codebreaker', minigamesController.codebreaker.get);
router.post('/codebreaker', minigamesController.codebreaker.post);

router.get("/higherlower", minigamesController.higherlower.get);
router.post("/higherlower", minigamesController.higherlower.post);

router.get("/hangman", minigamesController.hangman.get);
router.post("/hangman", minigamesController.hangman.post);
router.get("/hangman/results", minigamesController.hangman.result);

router.get('/blackjack', minigamesController.blackjack.get);
router.post('/blackjack', minigamesController.blackjack.post);

router.get('/tictactoe', minigamesController.ticTacToe.get);
router.post('/tictactoe', minigamesController.ticTacToe.post);

router.get('/matchpairs', minigamesController.matchpairs.get);
router.get('/matchpairs/result', minigamesController.matchpairs.result);

export default router;

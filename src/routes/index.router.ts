import {Router} from 'express'
import indexController from '../controllers/index.controller.js';
import {requireLoggedIn} from '../util/users.js'

const router = Router();

router.get('/', indexController.index);
router.get("/start", requireLoggedIn, indexController.start);
router.post("/game/new", requireLoggedIn, indexController.newGame);
router.get('/laurens-special-stick', (req, res) => res.render('laurens-special-stick'))
export default router;

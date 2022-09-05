import {Router} from 'express'
import indexRouter from './index.router.js'
import areasRouter from './areas.router.js'
import minigamesRouter from './minigames.router.js'
import usersRouter from './users.router.js'
import blockersRouter from './blockers.router.js'
import debugRouter from './debug.router.js'
import {requireActiveGame} from '../util/users.js'
import {logger} from '../util/logger.js'

const router = Router();
router.use('/', indexRouter);
router.use('/areas', requireActiveGame, areasRouter);
router.use('/minigames', requireActiveGame, minigamesRouter);
router.use('/users', usersRouter);
router.use('/blockers', requireActiveGame, blockersRouter);

/* istanbul ignore if */
if (process.env.NODE_ENV === 'development') {
	logger.warn('** DEVELOPMENT MODE - ENABLING /debug ROUTES **')
	router.use('/debug', debugRouter);
}
export default router;
import {RequestHandler} from 'express'

export const requireLoggedIn: RequestHandler = function (req, res, next) {
	if (!req.session?.user) {
		return res.redirect('/users/login')
	}
	next()
}

export const requireNotLoggedIn: RequestHandler = function (req, res, next) {
	if (req.session?.user) {
		return res.redirect('/')
	}
	next()
}

export const requireActiveGame: RequestHandler = function (req, res, next) {
	if (!req.session.user?.currentGame) {
		return res.redirect('/start')
	}
	next();
}
/* istanbul ignore file */

import express, { static as staticPath } from 'express';
import {logger} from './util/logger.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import ejsLayouts from 'express-ejs-layouts';
import router from './routes/router.js'
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {User} from './models/user.model.js'
import {WithId} from 'mongodb'
import {TicTacToeBoard} from './util/tic-tac-toe.js'
import herokuAwake from 'heroku-awake';

declare module 'express-session' {
	interface SessionData {
		user: WithId<User>;
		higherlower?: number[];
		blackjack?: {
			deck: string[],
			hand: string[],
			jacksScore: number,
		};
		codebreaker?: {
			targetCode: string;
			remainingGuesses: number;
			userGuesses: string[];
			guessCheck: number[][];
		};
		tictactoe?: TicTacToeBoard;
		hangman?: {
      		word: string;
      		guessedLetters: string[];
      		lives: number;
		};
	}
}

logger.info('Starting server')

const PORT = 3000;
const url = "https://backpacker-game.herokuapp.com/";

const app = express();

app.listen(PORT, () => {
  herokuAwake(url);
});

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use("/static", staticPath("./public"));

app.use((req, res, next) => {
	res.on('finish', () => logger.info(`${req.method} ${req.url} ${res.statusCode} ${req.ip}`))
	next()
});

app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}))

if (!process.env.MONGODB_URI || !process.env.MONGO_URL) {
	throw 'No MongoDB URL set!';
}


logger.info('Connecting to MongoDB');
await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
logger.info('Connected to MongoDB');
await import('./models/models.js')

if (!process.env.SESSION_SECRET) {
	throw 'No session secret set!';
}

app.use(session({
	secret: process.env.SESSION_SECRET,
	store: new MongoStore({client: mongoose.connection.getClient()}),
	resave: true,
	saveUninitialized: false
}))

app.use((req, res, next) => {
	res.locals.user = req.session?.user
	next()
})

app.use(router);

const port = process.env.PORT ?? 3000;
export default app.listen(port, () => logger.info(`Listening on port ${port}`));

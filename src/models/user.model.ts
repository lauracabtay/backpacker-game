import mongoose from 'mongoose'
import {Game} from './game.model.js'
import {WithId} from 'mongodb'

/**
 * A user
 */
export interface User {
	/**
	 * The user's email
	 */
	email: string,

	/**
	 * The user's display name
	 */
	name: string,

	/**
	 * bcrypt hash. Not to be shown to the user!
	 */
	password: string,

	/**
	 * The user's current game
	 */
	currentGame?: WithId<Game>
}

const userModel = mongoose.model('user', new mongoose.Schema<User>({
	email: String,
	password: String,
	name: String,
	currentGame: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'game'
	}
}))
export default userModel

/**
 * Removes any sensitive fields from a user.
 */
export function sanitise(user: User | mongoose.Document<User>): Omit<User, 'password'> {
	const object: Partial<User> = user instanceof mongoose.Document ? user.toObject<User>() : user
	delete object.password;
	return object as Omit<User, 'password'>;
}


import UserModel, {sanitise} from '../src/models/user.model'
import {expect, jest} from '@jest/globals'
import {requireActiveGame, requireLoggedIn, requireNotLoggedIn} from '../src/util/users.js'

describe('User sanitation', () => {
	it('correctly sanitises Users', () => {
		const sanitised = sanitise({
			name: 'example',
			email: 'test@example.com',
			currentGame: undefined,
			password: 'meme'
		})

		expect(sanitised.name).toBe('example');
		expect(sanitised.email).toBe('test@example.com');
		expect(sanitised.currentGame).toBeUndefined()
		// @ts-ignore
		expect(sanitised.password).toBeFalsy()
	})
	it('correctly sanitises Document<User>s', () => {
		const document = new UserModel({
			name: 'example',
			email: 'test@example.com',
			currentGame: undefined,
			password: 'meme'
		})
		const sanitised = sanitise(document)

		expect(sanitised.name).toBe('example');
		expect(sanitised.email).toBe('test@example.com');
		expect(sanitised.currentGame).toBeUndefined()
		// @ts-ignore
		expect(sanitised.password).toBeFalsy()
	})
})

describe('Authentication middleware', () => {
	const LOGGED_IN = {session: {user: {}}}

	it('redirects users when not logged in', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireLoggedIn({}, res, next);
		expect(res.redirect.mock.calls[0][0]).toBe('/users/login');
		expect(next.mock.calls.length).toBe(0)
	})

	it('does not redirect users when logged in', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireLoggedIn(LOGGED_IN, res, next);
		expect(res.redirect.mock.calls.length).toBe(0);
		expect(next.mock.calls.length).toBe(1)
	})

	it('redirects users when logged in', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireNotLoggedIn(LOGGED_IN, res, next);
		expect(res.redirect.mock.calls[0][0]).toBe('/');
		expect(next.mock.calls.length).toBe(0)
	})
})

describe('Require active game middleware', () => {
	it('redirects users when not logged in', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireActiveGame({session: {}}, res, next);
		expect(res.redirect.mock.calls[0][0]).toBe('/start');
		expect(next.mock.calls.length).toBe(0)
	})

	it('redirects users when no active game', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireActiveGame({session: {user: {currentGame: null}}}, res, next);
		expect(res.redirect.mock.calls[0][0]).toBe('/start');
		expect(next.mock.calls.length).toBe(0)
	})

	it('does not redirect users when they have an active game', () => {
		const res = {redirect: jest.fn()}
		const next = jest.fn()
		// @ts-ignore
		requireActiveGame({session: {user: {currentGame: {}}}}, res, next);
		expect(res.redirect.mock.calls.length).toBe(0);
		expect(next.mock.calls.length).toBe(1)
	})
})
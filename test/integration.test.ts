/**
 * Integration test shim so we can run Cypress from within Jest.
 * I could not for the life of me get either nyc or c8 to properly instrument
 * the source code, but Jest was doing it fine, hence this file.
 */

import cypress from 'cypress'
import mongoose from 'mongoose'
import CypressRunResult = CypressCommandLine.CypressRunResult
import {it, expect} from '@jest/globals'
import * as http from 'http'

describe('integration', () => {
	let server: http.Server;
	beforeAll(async () => {
		process.env.PORT = '3030';
		process.env.MONGO_URL = "mongodb://127.0.0.1:27017/finalproject_test"
		process.env.NODE_ENV = "development"
		server = (await import('../src/index')).default
	})

	it('integration', async () => {
		const result = await cypress.run()
		expect(result.status).toBe("finished")
		expect((result as CypressRunResult).totalFailed).toBe(0)
	}, 600000)

	afterAll(async () => {
		await mongoose.connection.close();
		server?.close();
	})
})

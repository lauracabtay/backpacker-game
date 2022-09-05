import {RequestHandler} from 'express'

/* istanbul ignore file */
export default interface Controller {
	[name: string] : RequestHandler
}
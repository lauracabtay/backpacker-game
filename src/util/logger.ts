import winston from 'winston'

export const logger = winston.createLogger({
	format: winston.format.cli(),
	transports: [new winston.transports.Console()]
});
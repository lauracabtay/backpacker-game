import mongoose from 'mongoose'

export default (async () => {
	await mongoose.connect('mongodb://127.0.0.1:27017/final-project-test')
	await import('../src/models/models')
})()
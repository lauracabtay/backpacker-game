# Final Project
[![codecov](https://codecov.io/gh/lucypoulton/final-project/branch/main/graph/badge.svg?token=Y0H8KCMKFS)](https://codecov.io/gh/lucypoulton/final-project)

## Setup
- Install dependencies `npm install`
- Start the server `npm start`

## Testing
- Run unit tests with `npm run test:unit`
- Run integration tests with `npm run test:integration`
- Run all tests and create coverage report with `npm run test`

## Code standards
- Use ES modules (`import x from 'y'`) instead of CommonJS (`const x = require('y')`)
- Prefer `async`/`await` over callbacks or `.then()`
- Use TypeScript instead of JS if you're comfortable with it

## Stack
- Node
- Express / EJS for templating
- MongoDB / Mongoose for persistence
- TypeScript / ts-node (mixed ts/js with implicit any allowed)
- Cypress and Jest for testing, using V8 native coverage
- Winston for logging

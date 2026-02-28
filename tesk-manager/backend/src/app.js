import express from 'express'
import routes from './modules/task.routes.js'
import errorHandler from './shared/errors/errorHandler.js'

const app = express()
app.use(express.json())
app.use(errorHandler)
app.use(routes)

export default app
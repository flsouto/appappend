import express from 'express'
import 'dotenv/config'
import usersRoute from './routes/users.js'
import {dbTrackerMiddleware} from './utils.js'

const app = express()

app.use(express.json())
app.use(dbTrackerMiddleware)

app.use('/users',usersRoute)
app.listen(process.env.APP_PORT);

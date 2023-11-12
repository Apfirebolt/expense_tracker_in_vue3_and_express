import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js'
import connectDB from './server/config/db.js'

import authRoutes from './server/routes/auth.js'
import expenseRoutes from './server/routes/expense.js'
import exp from 'constants'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8080'
}))

const __dirname = path.resolve()

app.use('/api/auth', authRoutes)
app.use('/api/expense', expenseRoutes)

let buildLocation = 'client/build'

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.use((req, res, next) => {
    console.log('This error page')
    const error = new Error('Not Found'); //Error object
    error.status = 404;

    //res.render('./404'); by default in express applications you would render a 404 page

    res.status(200).sendFile(path.join(__dirname+'/client/build/index.html'));

    next(error);

  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

export default app
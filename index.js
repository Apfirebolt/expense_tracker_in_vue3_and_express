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

app.get('/', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  const userData = {
    id: 1,
    name: 'John Toby',
    email: 'john@gmail.com'
  }
  const cookieName = 'employeeData';
  const cookieValue = JSON.stringify(userData);
  const expiresIn = 24 * 60 * 60; // 24 hours

  res.cookie(cookieName, cookieValue, {
    httpOnly: true, // Prevent client-side JavaScript access
    expires: new Date(Date.now() + expiresIn * 1000), // Set cookie expiration
  });

  // Call to the next middleware
  next()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.use(express.static(path.join(__dirname, '/client/dist')))

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
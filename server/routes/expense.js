import express from 'express'
const router = express.Router()
import {
  createExpense,
  getExpense,
  getUserExpenses,
  deleteExpense,
  updateExpense
} from '../controllers/expenseController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(protect, createExpense)
  .get(protect, getUserExpenses)

router
  .route('/:id')
  .get(protect, getExpense)
  .patch(protect, updateExpense)
  .delete(protect, deleteExpense)


export default router
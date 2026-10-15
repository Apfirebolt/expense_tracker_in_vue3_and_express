
import mongoose from "mongoose";

const modeTypes = ["Cash", "Credit Card", "Online", "UPI", "Gift Card", "Debit Card"];

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: modeTypes
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema)

export default Expense

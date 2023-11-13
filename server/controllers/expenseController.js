import asyncHandler from "express-async-handler";
import Expense from "../models/expense.js";

// @desc    List of user expense
// @route   GET /api/expense
// @access  Private
const getUserExpenses = asyncHandler(async (req, res) => {
  const itemsPerPage = 5;
  const startPage = req.query.page || 1;
  await Expense.find({ user: req.user._id })
    .populate("user", "firstName lastName")
    .skip(itemsPerPage * startPage - itemsPerPage)
    .limit(itemsPerPage)
    .exec()
    .then(async (expenses) => {
      const count = await Expense.countDocuments({
        user: req.user._id,
      })
      res.status(200).json({
        data: expenses,
        total: count,
        success: true,
        itemsPerPage,
        startPage,
        lastPage: Math.ceil(count / itemsPerPage),
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// @desc    Create a Expense
// @route   POST /api/expense
// @access  Private - User
const createExpense = asyncHandler(async (req, res) => {
  const { amount, type, description } = req.body;

  const expense = await Expense.create({
    amount,
    type,
    description,
    user: req.user._id,
  });

  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(400);
    throw new Error("Invalid Expense data");
  }
});

// @desc    Update existing Expense
// @route   PATCH /api/expense/id
// @access  Private - Admin only
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id });

  if (
    expense &&
    expense.user.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error("Only Expense owner or admin can edit Expense");
  }

  if (expense) {
    expense.amount = req.body.amount || expense.amount;
    expense.description = req.body.description || expense.description;
    expense.type = req.body.type || expense.type;
    const updatedExpense = await expense.save();

    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Delete existing Expense
// @route   DELETE /api/expense/id
// @access  Private - Admin or User
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (
    expense.user.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error("Only Expense owner or admin can delete Expense");
  }

  if (expense) {
    await Expense.deleteOne({
        _id: req.params.id,
        user: req.user._id
    });
    res.json({ message: "Expense removed" });
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Get existing Expense
// @route   GET /api/expense/id
// @access  Private - User or Admin
const getExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (
    expense.user.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    res.status(403);
    throw new Error("Only Expense owner and admin can view Expenses");
  }

  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

export {
  getUserExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
};

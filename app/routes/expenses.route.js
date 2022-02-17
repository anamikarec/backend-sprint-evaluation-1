const express = require("express");
const { validationResult } = require("express-validator");
const {
  getAllExpenses,
  getExpenses,
  getExpensesByType,
  createExpenses,
  deleteExpenses,
  patchExpenses,
  getAllExpensesByTypeInAscOrder
} = require("../controllers/expenses.controller");

const router = express.Router();

const Expenses = require("../models/expenses.model");
const validateExpenses = require("../utils/validateExpenses");

router.get("/", getAllExpenses);

router.get("/type", getAllExpensesByTypeInAscOrder);

router.get("/:employee_id", getExpenses);

router.get("/type/:type", getExpensesByType);

router.post("/", createExpenses);

router.delete("/:employee_id", deleteExpenses);

router.patch("/:employee_id", patchExpenses);

module.exports = router;

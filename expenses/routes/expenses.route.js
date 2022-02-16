const express = require("express");
const { validationResult } = require("express-validator");
const {
  getAllExpenses,
  getExpenses,
  createExpenses,
  deleteExpenses,
  patchExpenses,
} = require("../controllers/expenses.controller");

const router = express.Router();

const Expenses = require("../models/expenses.model");
const validateExpenses = require("../utils/validateExpenses");

router.get("/", getAllExpenses);

router.get("/:employee_id", getExpenses);

router.post("/", createExpenses);

router.delete("/:employee_id", deleteExpenses);

router.patch("/:employee_id", patchExpenses);

module.exports = router;

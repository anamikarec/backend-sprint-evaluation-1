const app=require("express")();
const expensesController = require('./controllers/expenses.controller');

app.use("/expenses",expensesController)

module.exports= app;
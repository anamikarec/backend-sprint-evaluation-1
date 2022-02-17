const app=require("express")();
const employeeController = require('./controllers/employee.controller');
const expensesController = require('./controllers/expenses.controller');

app.use("/employee",employeeController)

app.use("/expenses",expensesController)
//
module.exports= app;
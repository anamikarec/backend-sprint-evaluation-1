const app=require("express")();
const employeeController = require('./controllers/employee.controller');

app.use("/employee",employeeController)

module.exports= app;
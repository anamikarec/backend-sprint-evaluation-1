
const express=require("express");
const app =express();
const cors= require('cors');
const connect = require('./app/config/db');

const employeeRoute = require("./app/routes/employee.route");
const expensesRoute = require("./expenses/routes/expenses.route");

const PORT=5001;

app.use(cors());
app.use(express.json())

app.use("/expenses",expensesRoute);

const start= async ()=>{
    await connect();
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
}

module.exports=start;
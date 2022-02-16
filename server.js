
const express=require("express");
const app =express();
const cors= require('cors');
const connect = require('./app/config/db');

const employeeRoute = require("./app/routes/employee.route");

const PORT=5001;
app.set("view engine", "ejs")

app.use(cors());
app.use(express.json())

app.use("/employee",employeeRoute);

const start= async ()=>{
    await connect();
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
}

module.exports=start;
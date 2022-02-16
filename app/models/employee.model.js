
const app=require("express")();
const mongoose  = require("mongoose");

//Schema
const EmployeeSchema= new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true}
})

//Models
const Employee= mongoose.model("Employee",EmployeeSchema);

module.exports=Employee;
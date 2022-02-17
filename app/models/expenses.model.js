
const app=require("express")();
const mongoose  = require("mongoose");

//Schema
const ExpensesSchema= new mongoose.Schema({
    type: {type: String, required: true},
    dateOfExpense : {type : Number, required: true},
    reimbursed : {type: Boolean, required: true},
    reimbursed_date : {type: Date, required: true},
},
{timestamps: { created_at: () => Date.now() }}
)

//Models
const Expenses= mongoose.model("Expenses",ExpensesSchema);

module.exports=Expenses;
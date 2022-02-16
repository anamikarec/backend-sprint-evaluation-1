const express = require('express');
const {validationResult} = require('express-validator');

const router= express.Router();

const Expenses = require('../models/expenses.model');
const validateExpenses = require("../utils/validateExpenses");


const getAllExpenses= async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const expenses = await Expenses.find().skip(skip).limit(per_page);

        if(!expenses) return res.status(400).json({msg: "No expenses found"}) 
        return res.status(200).json(expenses);
           }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getExpenses = async (req,res)=>{
    try{
        
        const expenses = await Expenses.findOne({_id: req.params.employee_id});

        if(!expenses) return res.status(400).json({msg: "No Expenses found"}) 
        return res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const createExpenses = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const expenses = await Expenses.create({
            type: req.body.type,
            dateOfExpense: req.body.dateOfExpense,
            reimbursed: req.body.reimbursed,
            reimbursed_date: req.body.reimbursed_date
        })

        if(!expenses) return res.status(400).json({msg: "expenses not created"})

        //200 ok
        return res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const deleteExpenses =  async (req,res)=>{
    try{
        const expenses = await Expenses.findOneAndDelete({ _id: req.params.employee_id })
        if(!expenses) return res.status(404).json({msg: "expenses not found"})
        res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const patchExpenses = async (req,res)=>{
    try{
        if(!req.body.type) return res.status(400).json({msg: "Type is required"});
        const expenses = await Expenses.findOneAndUpdate({ 
            _id: req.params.employee_id 
        },{
            $set: {
                type: req.body.type,
                dateOfExpense: req.body.dateOfExpense,
                reimbursed: req.body.reimbursed,
                reimbursed_date: req.body.reimbursed_date
            }
        },{
            returnOriginal: false
        }
            )
        if(!expenses) return res.status(404).json({msg: "expenses not found"})
        res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

module.exports = {
    getAllExpenses,
    getExpenses,
    createExpenses,
    deleteExpenses,
    patchExpenses
};
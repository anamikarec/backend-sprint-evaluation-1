const express = require('express');
const {validationResult} = require('express-validator');

const router= express.Router();

const Employee= require('../models/employee.model');
const validateEmployee = require("../utils/validateEmployee");


const getAllEmployees= async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;

        const employees = await Employee.find().skip(skip).limit(per_page);

        if(!employees) return res.status(400).json({msg: "No employees found"}) 
        return res.status(200).json(employees);
           }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getEmployee = async (req,res)=>{
    try{
        
        const employees = await Employee.findOne({_id: req.params.employee_id});

        if(!employees) return res.status(400).json({msg: "No employee found"}) 
        return res.status(200).json(employees);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const createEmployee = async (req,res)=>{
    try{
        // console.log(req.file);
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        // * Create employees
        const doesEmployeeExist= await Employee.findOne({name : req.params.name});
        if(doesEmployeeExist) return res.status(400).json({msg: "Duplicate name found"})
        const employees = await Employee.create({
            name: req.body.name,
            gender: req.body.gender
        })

        if(!employees) return res.status(400).json({msg: "employees not created"})

        //200 ok
        return res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const deleteEmployee =  async (req,res)=>{
    try{
        const employees = await Employee.findOneAndDelete({ _id: req.params.employee_id })
        if(!employees) return res.status(404).json({msg: "employees not found"})
        res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const patchEmployee = async (req,res)=>{
    try{
        if(!req.body.name) return res.status(400).json({msg: "Name is required"});
        const employees = await Employee.findOneAndUpdate({ 
            _id: req.params.employee_id 
        },{
            $set: {
                name: req.body.name,
            }
        },{
            returnOriginal: false
        }
            )
        if(!employees) return res.status(404).json({msg: "employees not found"})
        res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

module.exports = {
    getAllEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    patchEmployee
};
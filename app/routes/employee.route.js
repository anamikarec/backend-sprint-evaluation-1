const express = require('express');
const {validationResult} = require('express-validator');
const { getEmployee, getAllEmployees, createEmployee, deleteEmployee, patchEmployee } = require('../controllers/employee.controller');

const router= express.Router();

const Employee= require('../models/employee.model');
const validateEmployee = require("../utils/validateEmployee");

router.get("/", getAllEmployees)

router.get("/:employee_id", getEmployee)


router.post("/", createEmployee)

router.delete("/:employee_id", deleteEmployee)

router.patch("/:employee_id", patchEmployee)

module.exports = router;
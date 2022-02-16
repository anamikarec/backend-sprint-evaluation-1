const {body} = require('express-validator');

const validateExpenses = ()=>([
    body("type")
    .not()
    .isEmpty()
    .withMessage("type should not be empty!")
    .isLength({min: 3})
    .withMessage("type should at least have 3 characters!")
    .isString()
    .withMessage("type should be a string!")
    ,
 body("dateOfExpenses")
   .not().isEmpty().withMessage("Date of expenses should not be empty!")
   .isString().withMessage("Date of expenses should be a Date type"),
 body("reimbursed_date")
   .not().isEmpty().withMessage("Date should not be empty!")
   .isString().withMessage("Date should be a Date type")
]
)

module.exports = validateExpenses;
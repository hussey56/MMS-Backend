const express = require('express')
const Router = express.Router();
const {AuthAdmin}= require('../Middleware/Admin/Admin')
const {NewExpense,LastData,AllExpense,UpdateExpense,CalculateExpense} = require('../Controller/Expense')
const {ValidateValues,ValidateTime}= require('../Middleware/Expense/Expense')
Router.route('/createexpense').post(ValidateValues,NewExpense)
Router.route('/updateexpense/:id').put(AuthAdmin,ValidateValues,UpdateExpense)
Router.route('/lastexpense').get(LastData)
Router.route('/allexpense').get(AllExpense)
Router.route('/monthexpense/:month/:year').get(CalculateExpense)

module.exports = Router
const express = require('express');
const Router = express.Router();

const {AuthAdmin,ValidateValues,ValidateEmployee,ValidateLogin,AuthEmployee,ValidatePassword} = require('../Middleware/Employee/employee')
const {TotalSalary,UpdatePassword,SingleEmployeeData,LoginEmployee,GrantBonus,NewEmployee,EmployeeList,SingleEmployee,DeleteEmployee,UpdateEmployee,CountGender,CalculateAverageSalary} = require('../Controller/Employee')

Router.route('/newamployee/admin').post(ValidateValues,AuthAdmin,NewEmployee)
Router.route('/employee/login').post(ValidateLogin,LoginEmployee)
Router.route('/singleemployee/update/:id').put(ValidateValues,AuthAdmin,UpdateEmployee)
Router.route('/employeelist/admin').get(AuthAdmin,EmployeeList)
Router.route('/singleemployee/admin').get(AuthAdmin,SingleEmployee)
Router.route('/grantbonusemployee').post(AuthAdmin,ValidateEmployee,GrantBonus)
Router.route('/employeebygender/:name').get(CountGender)
Router.route('/employeeaveragesalary').get(CalculateAverageSalary)
Router.route('/employeetotalsalary').get(TotalSalary)
Router.route('/singleemployee/delete/:id').delete(AuthAdmin,DeleteEmployee)
Router.route('/singleemployee/data').get(AuthEmployee,SingleEmployeeData)
Router.route('/updateemployeepassword/:id').put(ValidatePassword,UpdatePassword)
 
module.exports = Router
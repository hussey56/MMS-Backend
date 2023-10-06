const express = require('express');
const Router = express.Router();

const {ValidationRegistration,ValidateLogin,AuthCustomer} = require('../Middleware/Customer/Register')
const {AuthAdmin}= require('../Middleware/Reservation/index')
const {ValidatePassword} = require('../Middleware/Employee/employee')
const {NewCustomer,LoginCustomer,CustomerInfo,CustomerAdminData,UpdatePassword} = require('../Controller/Customer')

Router.route('/register').post(ValidationRegistration,NewCustomer);
Router.route('/login').post(ValidateLogin,LoginCustomer);
Router.route('/fetchdata').get(AuthCustomer,CustomerInfo);
Router.route('/customerdataforadmin').get(AuthAdmin,CustomerAdminData)
Router.route('/changepasswordcustomer/:id').put(ValidatePassword,UpdatePassword)

module.exports = Router;
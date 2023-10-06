const express = require('express');
const Router = express.Router();

const {ValidateValues,LoginValues,AuthAdmin} = require('../Middleware/Admin/Admin');
const {newAdmin,LoginAdmin,InfoAdmin,AllAdmin,UpdateAdmin,DeletAdmin,UpdatePassword} = require('../Controller/Admin')
const {ValidatePassword} = require('../Middleware/Employee/employee')

Router.route('/createadmin/new').post(ValidateValues,newAdmin);
Router.route('/updatebysuper/:id').put(AuthAdmin,ValidateValues,UpdateAdmin);
Router.route('/updatestatusbysuper/:id').put(AuthAdmin,UpdateAdmin);
Router.route('/loginadmin').post(LoginValues,LoginAdmin);
Router.route('/admindata').get(AuthAdmin,InfoAdmin);
Router.route('/alladmin').get(AuthAdmin,AllAdmin);
Router.route('/deleteadmin/:id').delete(AuthAdmin,DeletAdmin);
Router.route('/changepasswordadmin/:id').put(ValidatePassword,UpdatePassword);

module.exports = Router
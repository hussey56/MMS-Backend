const express = require('express');
const Router = express.Router()
const {AuthAdmin} = require('../Middleware/Admin/Admin')
const {ValidateValues} = require('../Middleware/Employee/Role')
const {newRole,getRoleName,RoleList,DeleteRole,UpdateRole} = require('../Controller/EmployeeRoles')


Router.route('/create/roles').post(ValidateValues,AuthAdmin,newRole)
Router.route('/roles/update/:id').put(ValidateValues,AuthAdmin,UpdateRole)
Router.route('/roles/name').post(getRoleName)
Router.route('/roles/list').get(RoleList)
Router.route('/roles/delete/:id').delete(AuthAdmin,DeleteRole)


module.exports = Router
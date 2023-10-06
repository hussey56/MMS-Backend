const express = require('express');
const router = express.Router();
const {NewInventory,AllInventory,UpdateInventory,DeleteInventory,FiveInventory} = require('../Controller/Inventory')
const {AuthAdmin} = require('../Middleware/Admin/Admin')
const {ValidateValues} = require('../Middleware/Inventory/index')
router.route('/addainventory').post(AuthAdmin,ValidateValues,NewInventory)
router.route('/getallinventory').get(AuthAdmin,AllInventory)
router.route('/getfiveinventory').get(AuthAdmin,FiveInventory)
router.route('/deleteinventory/:id').delete(AuthAdmin,DeleteInventory)
router.route('/updateinventory/:id').put(AuthAdmin,ValidateValues,UpdateInventory)


module.exports = router
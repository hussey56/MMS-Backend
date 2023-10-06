const express = require('express');
const router = express.Router();
const {newEvent,AllEvent,DeleteEvent,UpdateInventory,FindEvent} = require('../Controller/Event')
const {AuthAdmin} = require('../Middleware/Admin/Admin')
const {ValidateValues} = require('../Middleware/Event/event')

router.route('/makeaevent').post(AuthAdmin,ValidateValues,newEvent);
router.route('/updateevent/:id').put(AuthAdmin,ValidateValues,UpdateInventory);
router.route('/allevent').get(AllEvent);
router.route('/findevent/:id').get(FindEvent);

router.route('/deleteevent/:id').delete(AuthAdmin,DeleteEvent);
module.exports = router
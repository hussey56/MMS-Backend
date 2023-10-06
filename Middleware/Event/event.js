const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';


const ValidateValues =  [
    body('name').notEmpty().withMessage('Name is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('price100').isNumeric().withMessage('price 100 is required'),
    body('price200').isNumeric().withMessage('price 200 is required'),
    body('price400').isNumeric().withMessage('price 400 is required'),
    body('price600').isNumeric().withMessage('price 600 is required'), 
    body('perhour').isNumeric().withMessage('per hour is required'), 
    body('perday').isNumeric().withMessage('Use number is required'), 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  module.exports = {ValidateValues}
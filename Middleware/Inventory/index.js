const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';



const ValidateValues =  [
    body('item').notEmpty().withMessage('Name is required'),
    body('qty').isNumeric().withMessage('Quantity is required'),
    body('use').isNumeric().withMessage('Use number is required'),
    body('icon').notEmpty().withMessage('Icon is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  module.exports = {ValidateValues}
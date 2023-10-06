const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';

const ValidateValues =  [
    body('name').notEmpty().withMessage('Name is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  module.exports = {ValidateValues}
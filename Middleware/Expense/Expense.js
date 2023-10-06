const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';

const ValidateValues =  [
    body('year').notEmpty().withMessage("Year is required"),
    body('month').notEmpty().withMessage("month is required"),
    body('labels').isArray().withMessage('Labels is required'),
    body('values').isArray().withMessage('Values is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  const ValidateTime =  [
    body('year').notEmpty().withMessage("Year is required"),
    body('month').notEmpty().withMessage("month is required"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  module.exports = {ValidateValues,ValidateTime}
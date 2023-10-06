const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';

const ValuesRegistration = [
    body('reservator_name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('reservator_phone').notEmpty().withMessage('Contact is required'),
    body('guests').notEmpty().withMessage('Total No Of Guest is required'),
    body('event').isObject().withMessage('event must b an object'),
    body('event_type').notEmpty().withMessage('event must b an object'),
    body('eventid').notEmpty().withMessage('event id is missing'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];
const AuthCustomer = async (req,res,next)=>{
  const token = req.header('customer_token')
  if(!token){
   return   res.status(401).json({error:'Invalid token attempting'})
  }
  try {
      const data =   jwt.verify(token,JSON_WEBTOKEN);
      req.customer = data.customer;
      next()
  } catch (error) {
     return res.status(401).json({error:"Server Error"});
  }
}
const AuthAdmin = async(req,res,next)=>{
  const token = req.header('admin_token')
  if(!token){
   return   res.status(401).json({error:'Invalid token attempting'})
  }
  try {
    
    const data =   jwt.verify(token,JSON_WEBTOKEN);
    req.admin = data.admin;
    next()
  } catch (error) {
     return res.status(401).json({error:"Server Error"});
  }
}
const ValuesUpdates = [
  body('id').notEmpty().withMessage('id is required'),
  body('status').notEmpty().withMessage('status is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {ValuesRegistration,AuthCustomer,AuthAdmin,ValuesUpdates}

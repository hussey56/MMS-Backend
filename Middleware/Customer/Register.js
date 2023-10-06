const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';

const ValidationRegistration = [
    body('cname').notEmpty().withMessage('Name is required'),
    body('cemail').isEmail().withMessage('Email is required'),
    body('ccontact').notEmpty().withMessage('Conatct is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
]
const ValidateLogin = [
  body('email').notEmpty().withMessage("Email is required"),
  body('email').isEmail().withMessage("email format is required"),
  body('password').notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]

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
module.exports = {ValidationRegistration,ValidateLogin,AuthCustomer}                                                                           
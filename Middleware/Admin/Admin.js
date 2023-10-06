const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';


const ValidateValues =  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('role is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  const LoginValues = [
    body('email').isEmail().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req,res,next)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

      }
      next();
    }
  ]
  const AuthAdmin =  async (req,res,next)=>{
    const token = req.header('admin_token')
    if(!token){
     return   res.status(401).json({error:'Empty token attempting'})
    }
    try {
        const data = await jwt.verify(token,JSON_WEBTOKEN);
        req.admin = data.admin;
        next()
    } catch (error) {
       return res.status(401).json({error:"Invalid Token Attempting"});
    }
  }
module.exports = {ValidateValues,LoginValues,AuthAdmin}

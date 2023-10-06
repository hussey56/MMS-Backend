const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const JSON_WEBTOKEN = 'UMR111';

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

  const ValidateValues =  [
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').notEmpty().withMessage('GENDER is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('dob').notEmpty().withMessage('dob is required'),
    body('phone').notEmpty().withMessage('phone is required'),
    body('bonus').notEmpty().withMessage('Bonus is required'),
    body('role_id').notEmpty().withMessage('role is required'),
    body('salary').notEmpty().withMessage('salary is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  const ValidateEmployee =  [
    body('id').notEmpty().withMessage('Id is required'),
    body('bonus').notEmpty().withMessage('Bonus is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  const ValidateLogin = [
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error:true,msg:"Required fields are empty", errors: errors.array() });
      }
      next();
    },
  ];
  const ValidatePassword = [
    body('oldpassword').notEmpty().withMessage('Old Password is required'),
    body('newpassword').notEmpty().withMessage('New Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error:true,msg:"Required fields are empty", errors: errors.array() });
      }
      next();
    },
  ];
  const AuthEmployee =  async (req,res,next)=>{
    const token = req.header('employee_token')
    if(!token){
     return   res.status(401).json({error:true,msg:'Empty token attempting'})
    }
    try {
        const data = await jwt.verify(token,JSON_WEBTOKEN);
        req.employee = data.employee;
        next()
    } catch (error) {
       return res.status(401).json({error:true,msg:"Invalid Token Attempting"});
    }
  }
  module.exports = {AuthAdmin,ValidateValues,ValidateEmployee,ValidateLogin,AuthEmployee,ValidatePassword}
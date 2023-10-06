const Customer = require('../Model/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token
const Admin = require('../Model/Admin')
const JSON_WEBTOKEN = 'UMR111';

const NewCustomer = async(req,res)=>{
try {
    const {cname,cemail,password,ccontact} = req.body;
    let customer = await Customer.findOne({email:cemail});
    if(customer){
        return res.status(400).send({error:'This Email is already taken',token:1})
    }
    
    const salt = await bcrypt.genSalt(9);
    const hpassword = await bcrypt.hash(password,salt);
    customer = new Customer({
      name:cname,
      email:cemail,
      contact:ccontact,
      password:hpassword
    });
    const save = await customer.save()
    const data = {
        customer:{
                id:customer.id,
          },
    }
    const token = jwt.sign(data,JSON_WEBTOKEN)
    
    res.json({Auth:token}); 
    
} catch (error) {
    return res.status(500).json({error})
}
}
const LoginCustomer = async (req,res)=>{
try {
    const {email,password} = req.body
        let customer = await Customer.findOne({email:email});
        if(!customer){
            return res.json({error:"Invalid Credentials email"})  
        }
        const comparepassword = await bcrypt.compare(password,customer.password)
        if(!comparepassword){
            return res.json({error:"Invalid Credentials password"})  
        }
        const data ={
            customer:{
                id:customer.id,
            },
        }
        const token = await jwt.sign(data,JSON_WEBTOKEN)
        res.json({token,error:false})

} catch (error) {
    return res.status(500).json({error});
}
}
const CustomerInfo = async (req,res)=>{
try {
  const Cid = req.customer.id;
  let customer = await Customer.findById(Cid);
  if(!customer){
    return res.status(401).send("Invalid Customer Credentails")
   } 
   res.json({customer})  
} catch (error) {
    return res.status(500).json({error})
}
}
const CustomerAdminData = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const data = await Customer.find();
        const no  =  data.length;
        res.json({data,no})
    } catch (error) {
        return res.status(500).send({error})
    }
}
const UpdatePassword = async(req,res)=>{
    try {
      const {oldpassword,newpassword} = req.body
      let customer = await Customer.findById(req.params.id);
      if(!customer){
          return res.status(404).send({msg:"Customer not found",error:true});
      }
      const comparepassword = await bcrypt.compare(oldpassword,customer.password)
      if(!comparepassword){
        return res.json({error:true,msg:"Your Current Password dont matches"})  
    }
    const salt = await bcrypt.genSalt(9);
    const epassword = await bcrypt.hash(newpassword,salt);
    let updt = await Customer.findByIdAndUpdate(req.params.id,{password:epassword},{new:true}); //updating the existing or making it from scratch
    res.json({updt,error:false});
    } catch (errorr) {
      return res.status(500).send({error:true,msg:errorr})
    }
  }
module.exports = {NewCustomer,LoginCustomer,CustomerInfo,CustomerAdminData,UpdatePassword}
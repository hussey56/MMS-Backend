const Admin = require('../Model/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token

const JSON_WEBTOKEN = 'UMR111';

const newAdmin = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        let admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).send({msg:'This Email is already taken',error:true})
        }
        const salt = await bcrypt.genSalt(9);
        const hpassword = await bcrypt.hash(password,salt);
        admin = new Admin({
            name,
            email,
            password:hpassword,role
        });
        const save = await admin.save();
        const data = {
            admin:{
                    id:admin.id,
              },
        }
        const token = jwt.sign(data,JSON_WEBTOKEN)
        res.json({msg:token,error:false})
        
    } catch (error) {
        return res.status(500).send({error:true,msg:"Internal Server Error has been occured"})
    }
}
const LoginAdmin = async(req,res)=>{
    try {
        const {email,password} = req.body
        let admin = await Admin.findOne({email:email});
        if(!admin){
            return res.json({token:0,msg:"Invalid Credentials email",error:true})  
        }
        const comparepassword = await bcrypt.compare(password,admin.password)
        if(!comparepassword){
            return res.json({token:0,msg:"Invalid Credentials password",error:true})  
        }
        const data ={
            admin:{
                id:admin.id,
            },
        }
        const token = await jwt.sign(data,JSON_WEBTOKEN)
        res.json({token:token,error:false,msg:"Login Successfull"})  
    } catch (error) {
        return res.status(500).send({error})
    }
}
const InfoAdmin = async (req,res)=>{
    try {
        const Aid = req.admin.id;
        let admin = await Admin.findById(Aid);
        if(!admin){
          return res.status(401).send("Invalid Admin Credentails")
         } 
         res.json({admin})  
    } catch (error) {
       return res.status(500).send({error}) 
    }
}
const AllAdmin = async(req,res)=>{
    try {
        const Aid = req.admin.id;
        let admin = await Admin.findById(Aid);
        if(!admin){
          return res.status(401).send({msg:"Invalid Customer Credentails",error:true})
         } 
        let data = await Admin.find().select("-password");
        res.json({datar:data,error:false})
        
    } catch (errorr) {
        return res.status(500).send({msg:"Internal Sever Error"+errorr,error:true})
    }
}
const UpdateAdmin = async(req,res)=>{
try {
    const {name,email,password,role}=req.body
    const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
return res.status(401).send({msg:"Invalid Admin Credentails",error:true})
} 
let id = await Admin.findById(req.params.id);
if(!id){
    return res.status(404).send({msg:"Admin not found",error:true});
}
let NewAdmin = {}
if(name){
NewAdmin.name = name
}
if(email){
NewAdmin.email = email
}
if(password){
    const salt = await bcrypt.genSalt(9);
    const hpassword = await bcrypt.hash(password,salt);
NewAdmin.password = hpassword
}
if(role){
NewAdmin.role = role
}
let updt = await Admin.findByIdAndUpdate(req.params.id,{$set:NewAdmin},{new:true}); //updating the existing or making it from scratch
res.json({ver:updt,error:false,msg:"Updated Successfully"});
} catch (error) {
    return res.status(500).send({error:true,msg:"Internal Server Error has been occured"})
}
}
const UpdateAdminStatus = async(req,res)=>{
    try {
        const {role}=req.body
        const Aid = req.admin.id;
    let admin = await Admin.findById(Aid);
    if(!admin){
    return res.status(401).send({msg:"Invalid Admin Credentails",error:true})
    } 
    let id = await Admin.findById(req.params.id);
    if(!id){
        return res.status(404).send({msg:"Admin not found",error:true});
    }
  


    let updt = await Admin.findByIdAndUpdate(req.params.id,{role:role},{new:true}); //updating the existing or making it from scratch
    res.json({ver:updt,error:false,msg:"Updated Successfully"});
    } catch (error) {
        return res.status(500).send({error:true,msg:"Internal Server Error has been occured"})
    }
    }
const DeletAdmin = async(req,res)=>{
    try
  {
    const aid = req.admin.id;
    let admin = await Admin.findById(aid);
    if(!admin){
        return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
    }
    let id = await Admin.findById(req.params.id);
    if(!id){
        return res.status(404).json({msg:"Admin not found",error:true});
    }
    id = await Admin.findByIdAndDelete(req.params.id);
    res.json({success: "Admin has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
  }catch(errorr){
    return res.status(500).send({msg:errorr,error:true})
  }
}
const UpdatePassword = async(req,res)=>{
    try {
      const {oldpassword,newpassword} = req.body
      let admin = await Admin.findById(req.params.id);
      if(!admin){
          return res.status(404).send({msg:"Admin not found",error:true});
      }
      const comparepassword = await bcrypt.compare(oldpassword,admin.password)
      if(!comparepassword){
        return res.json({error:true,msg:"Your Current Password dont matches"})  
    }
    const salt = await bcrypt.genSalt(9);
    const epassword = await bcrypt.hash(newpassword,salt);
    let updt = await Admin.findByIdAndUpdate(req.params.id,{password:epassword},{new:true}); //updating the existing or making it from scratch
    res.json({updt,error:false});
    } catch (errorr) {
      return res.status(500).send({error:true,msg:errorr})
    }
  }
module.exports = {UpdatePassword,newAdmin,LoginAdmin,InfoAdmin,AllAdmin,UpdateAdmin,DeletAdmin,UpdateAdminStatus}
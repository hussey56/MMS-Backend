const Roles = require('../Model/EmpRoles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token
const Admin = require('../Model/Admin');
const EmpRoles = require('../Model/EmpRoles');
const JSON_WEBTOKEN = 'UMR111';
const Employee  = require('../Model/Employee')
const newRole = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const {name} = req.body;
        let role = await Roles.findOne({name:name});
        if(role){
            return res.status(400).send({error:true,msg:'This Role Name is already taken'})
        }
        role = new Roles({
            name:name,
            created_by:aid,
        })
        const save = await role.save();
        const data = {
            role:{
                    id:role.id,
              },
        }
        const token = jwt.sign(data,JSON_WEBTOKEN)
        
        res.json({msg:token,error:false}); 
    } catch (errorr) {
        return res.status(500).send({error:true,msg:errorr})
    }
}
const getRoleName = async(req,res)=>{
    try {
     const {id} = req.body
     let Role = await EmpRoles.findById(id);
     if(!Role){
        return res.status(300).send({msg:"Invalid Role id"})
     }   
     res.json({Role})
    } catch (error) {
        return res.status(500).json({error,msg:"Internal server Error, ID Is Required"})
    }
}
const RoleList = async(req,res)=>{
    try {
    
     let Roles = await EmpRoles.find();
    
     res.json({Roles})
    } catch (error) {
        return res.status(500).json({error,msg:"Internal server Error, ID Is Required"})
    }
}
const DeleteRole = async(req,res)=>{
    try {
        const fieldName = 'role_id';
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let id = await EmpRoles.findById(req.params.id);
        if(!id){
            return res.status(404).json({msg:"Role not found"});
        }
let employee = await Employee.deleteMany({'role_id':id})        
    
  
        id = await EmpRoles.findByIdAndDelete(req.params.id);
        res.json({success: "Role has been Deleted ",msg:"Deleted Sucessfully Roles and Employees id#"+id,error:false});
   
    } catch (err) {
       return res.status(500).json({err,error:true,msg:"Internal Sever Error"}) 
    }
}
const UpdateRole = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const {name} = req.body;
        let id = await EmpRoles.findById(req.params.id);
        if(!id){
            return res.status(404).send({error:true,msg:"Employee role not found"});
        }
        let NewRole = {}
        if(name){
            NewRole.name = name
        }
        if(aid){
            NewRole.created_by = aid
        }
        let updt = await EmpRoles.findByIdAndUpdate(req.params.id,{$set:NewRole},{new:true}); //updating the existing or making it from scratch
        res.json({updt,error:false})
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"Internal Server Error. "+errorr})
    }
}
module.exports = {newRole,getRoleName,RoleList,DeleteRole,UpdateRole}
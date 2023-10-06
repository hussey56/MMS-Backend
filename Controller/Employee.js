const Employee = require('../Model/Employee');
const EmplRole = require('../Model/EmpRoles')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token
const Admin = require('../Model/Admin')
const JSON_WEBTOKEN = 'UMR111';


const NewEmployee = async(req,res)=>{
try
{
const {name,gender,password,dob,phone,role_id,salary,bonus} = req.body
const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
  return res.status(401).send({msg:"Invalid Customer Credentails",error:true})
 } 
 let employee = await Employee.findOne({phone})
 if(employee){
     return res.status(400).send({msg:'This Phone is already Registered',error:true})
 }
 
 let chackRole = await EmplRole.findById(role_id)
 if(!chackRole){
    return res.status(401).send({msg:"Wrong role id",error:true})
   }
   const salt = await bcrypt.genSalt(9);
 const epassword = await bcrypt.hash(password,salt);
 employee = new Employee({
    name,
    gender,
    password:epassword,
    dob,
    role_id,
    phone,
    salary,
    bonus,
    admin_id:Aid
 })
 const save = await employee.save()
//  const data = {
//     employee:{
//             id:employee.id,
//       },
// }
// const token =  jwt.sign(data,JSON_WEBTOKEN)
res.json({msg:employee,error:false})
}catch(error){
    return res.status(500).json({error:true,msg:"internal error"})
}
}
const EmployeeList = async(req,res)=>{
  try {
    const Aid = req.admin.id;
    let admin = await Admin.findById(Aid);
    if(!admin){
      return res.status(401).send("Invalid Admin Credentails")
     } 
   let Employees = await Employee.find();
  
   res.json({Employees,len:Employees.length})
  } catch (error) {
      return res.status(500).json({error,msg:"Internal server Error, ID Is Required"})
  }
}
const SingleEmployee = async(req,res)=>{
  try {
    const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
  return res.status(401).send("Invalid Admin Credentails")
 } 
   const {id} = req.body
   let Emp = await Employee.findById(id);
   if(!Emp){
      return res.status(300).send({msg:"Invalid Employee id"})
   }   
   res.json({Emp})
  } catch (error) {
      return res.status(500).json({error,msg:"Internal server Error, ID Is Required"})
  }
}
const SingleEmployeeData = async(req,res)=>{
  try {
    const Eid = req.employee.id;
    let emp = await Employee.findById(Eid);
    if(!emp){
      return res.status(401).send({error:true,msg:"Invalid Credentails"})
     } 
     res.json({emp,error:false})  
} catch (error) {
   return res.status(500).send({error}) 
}
}
const DeleteEmployee = async(req,res)=>{
  try
  {
    const aid = req.admin.id;
    let admin = await Admin.findById(aid);
    if(!admin){
        return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
    }
    let id = await Employee.findById(req.params.id);
    if(!id){
        return res.status(404).json({msg:"Employee not found"});
    }
    id = await Employee.findByIdAndDelete(req.params.id);
    res.json({success: "Employee has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
  }catch(error){
    return res.status(500).send({msg:error})
  }
}
const UpdateEmployee = async(req,res)=>{
  try {

    const {name,gender,password,dob,phone,role_id,salary,bonus} = req.body
const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
  return res.status(401).send("Invalid Admin Credentails")
 } 
    let id = await Employee.findById(req.params.id);
    if(!id){
        return res.status(404).send("Employee not found");
    }
    let chackRole = await EmplRole.findById(role_id)
    if(!chackRole){
       return res.status(401).send("Wrong role id")
      }
      const salt = await bcrypt.genSalt(9);
    const epassword = await bcrypt.hash(password,salt);
    let newEmployee = {}
    if(name){
      newEmployee.name = name;
    }
    if(gender){
      newEmployee.gender = gender;
    }
    if(password){
      newEmployee.password = epassword
    }
    if(dob){
      newEmployee.dob = dob
    }
    if(salary){
      newEmployee.salary = salary
    }
    if(phone){
      newEmployee.phone = phone
    }
    if(role_id){
      newEmployee.role_id = role_id
    }
    if(Aid){
      newEmployee.admin_id = Aid
    }
    if(bonus){
      newEmployee.bonus =bonus
    }
    let updt = await Employee.findByIdAndUpdate(req.params.id,{$set:newEmployee},{new:true}); //updating the existing or making it from scratch
    res.json(updt);
  } catch (error) {
   return res.status(500).send({msg:error,err:true}) 
  }
}
const CountGender = async(req,res)=>{
  try {
   const gender = req.params.name
   let name = await Employee.find({gender})
   if(!name){
    return res.status(404).json({msg:"This gender employee not found"});
   } 
   res.json({name,len:name.length})
  } catch (error) {
    return res.status(500).send({msg:error,err:true})
  }
}
const CalculateAverageSalary = async(req,res)=>{

  try {
    const result = await Employee.aggregate([
      {
        $group: {
          _id: null,
          averageSalary: { $avg: '$salary' },
        },
      },
    ]);
    res.status(200).json({result});
  
 
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate average salary' });
  }
}
const TotalSalary = async(req,res)=>{
  try {
    const result = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: '$salary' },
        },
      },
    ]);
    const salary = result[0].totalSalary
    res.status(200).json({salary});

  } catch (error) {
   return res.status(500).json({ error:true,msg: 'Failed to calculate average salary' });

  }
}
const LoginEmployee = async (req,res)=>{
  try {
      const {phone,password} = req.body
          let employee = await Employee.findOne({phone:phone});
          if(!employee){
              return res.json({error:true,msg:"Invalid Credentials Phone Number"})  
          }
          const comparepassword = await bcrypt.compare(password,employee.password)
          if(!comparepassword){
              return res.json({error:true,msg:"Invalid Credentials password"})  
          }
          const data ={
            employee:{
                  id:employee.id,
              },
          }
          const token = await jwt.sign(data,JSON_WEBTOKEN)
          res.json({msg:token,error:false})
  
  } catch (errorr) {
      return res.status(500).json({error:true,msg:errorr});
  }
  }
const GrantBonus = async(req,res)=>{
  try {
    const aid = req.admin.id;
    let admin = await Admin.findById(aid);
    if(!admin){
        return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
    }
   const {id,bonus} = req.body
   const employee = await Employee.findById(id);
   if(!employee){
    return res.status(401).json({error:true,msg:"Invalid Credentials"})
   } 
   const UpdatedOne = await Employee.findByIdAndUpdate(id,{bonus:bonus},{new:true});
   res.json({error:false,msg:"Updated Successfully"})
  } catch (errorr) {
    return res.status(500).send({error:true,msg:"Internal Server Error."+errorr})
  }
}
const UpdatePassword = async(req,res)=>{
  try {
    const {oldpassword,newpassword} = req.body
    let employee = await Employee.findById(req.params.id);
    if(!employee){
        return res.status(404).send("Employee not found");
    }
    const comparepassword = await bcrypt.compare(oldpassword,employee.password)
    if(!comparepassword){
      return res.json({error:true,msg:"Your Current Password dont matches"})  
  }
  const salt = await bcrypt.genSalt(9);
  const epassword = await bcrypt.hash(newpassword,salt);
  let updt = await Employee.findByIdAndUpdate(req.params.id,{password:epassword},{new:true}); //updating the existing or making it from scratch
  res.json({updt,error:false});
  } catch (errorr) {
    return res.status(500).send({error:true,msg:errorr})
  }
}
module.exports = {TotalSalary,UpdatePassword,SingleEmployeeData,LoginEmployee,GrantBonus,NewEmployee,EmployeeList,SingleEmployee,DeleteEmployee,UpdateEmployee,CountGender,CalculateAverageSalary}
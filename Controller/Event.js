const Event = require('../Model/Event');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token
const Admin = require('../Model/Admin')
const JSON_WEBTOKEN = 'UMR111';


const newEvent = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const {name,price100,price200,price400,price600,color,perhour,perday} = req.body
        let event  = await Event.findOne({name});
        if(event){
            return res.status(401).send({msg:"Name already exist",error:true})
        }
        event = new Event({
            name,
            price100,
            price200,
            price400,
            price600,
            color,perhour,perday
        })
        const save = await event.save();
        const data = {
            event:{
                    id:event.id,
              },
        }
        const token = jwt.sign(data,JSON_WEBTOKEN)
        
        res.json({msg:token,error:false}); 
    } catch (errorr) {
        return res.status(500).send({error:true,msg:errorr})
    }
}
const AllEvent = async (req,res)=>{
    try {
        let data = await Event.find()
       return  res.json({all:data,error:false})
    } catch (errorr) {
        return res.status(500).json({error:true,msg:"Internal Server Error"+errorr})
    }
}
const DeleteEvent = async(req,res)=>{
    try {
        const aid = req.admin.id
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let id = await Event.findById(req.params.id);
        if(!id){
            return res.status(404).json({msg:"Inventory Item not found",error:true});
        }
        id = await Event.findByIdAndDelete(req.params.id);
        res.json({success: "Event Item has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue",error:true})
    }
}
const UpdateInventory = async(req,res)=>{
    try {
        const {name,price100,price200,price400,price600,last_updated,color,perhour,perday} = req.body
        const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
  return res.status(401).send({msg:"Invalid Admin Credentails",error:true})
 } 
    let id = await Event.findById(req.params.id);
    if(!id){
        return res.status(404).send({msg:"Item not found",error:true});
    }
    let NewEvent = {}
   if(name){
    NewEvent.name = name
   }
   if(price100){
    NewEvent.price100 = price100
   }
   if(price200){
    NewEvent.price200 = price200
   }
   if(price400){
    NewEvent.price400 = price400
   }
   if(price600){
    NewEvent.price600 = price600
   }
   if(last_updated){
    NewEvent.last_updated = last_updated
   }
   if(color){
    NewEvent.color = color
   }
   if(perhour){
    NewEvent.perhour = perhour
   }
   if(perday){
    NewEvent.perday = perday
   }
   let updt = await Event.findByIdAndUpdate(req.params.id,{$set:NewEvent},{new:true}); //updating the existing or making it from scratch
    res.json({ver:updt,error:false,msg:"Updated Successfully"});
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"Internal Server Error"+errorr})
    }
}

const FindEvent = async(req,res)=>{
    try {
        let data = await Event.findById(req.params.id);
        if(!data){
            return res.status(404).json({msg:"Event Item not found",error:true});
        }
        res.json({data,error:false})
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"Internal Server Error"+errorr})

    }
}
module.exports = {newEvent,AllEvent,DeleteEvent,UpdateInventory,FindEvent}
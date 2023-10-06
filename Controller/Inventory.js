
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //importing jwt token
const Admin = require('../Model/Admin');
const Inventory = require('../Model/Inventory')
const JSON_WEBTOKEN = 'UMR111';

const NewInventory = async(req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        const {item,icon,qty,use} = req.body;
        let thing = await Inventory.findOne({item:item});
        if(thing){
            return res.status(400).send({msg:'This Item Name is already taken',token:1,error:true})
        }
        thing = new Inventory({
            item,
            icon,
            qty,
            use
        })
        const save = await thing.save();
        const data = {
            thing:{
                    id:thing.id,
              },
        }
        const token = jwt.sign(data,JSON_WEBTOKEN)
        
        res.json({token,error:false}); 
    } catch (er) {
        return res.status(500).send({error:true,msg:er})
    }
}
const AllInventory = async (req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let data = await Inventory.find()
        res.json({all:data,len:data.length})
    } catch (error) {
        return res.status(500).send({error,msg:"Internal Server Error"})
    }
}
const UpdateInventory = async(req,res)=>{
    try {
        const {item,icon,qty,use}=req.body
        const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
  return res.status(401).send({msg:"Invalid Admin Credentails",error:true})
 } 
    let id = await Inventory.findById(req.params.id);
    if(!id){
        return res.status(404).send({msg:"Item not found",error:true});
    }
    let NewInventory = {}
   if(item){
    NewInventory.item = item
   }
   if(icon){
    NewInventory.icon = icon
   }
   if(qty){
    NewInventory.qty = qty
   }
   if(use){
    NewInventory.use = use
   }
   let updt = await Inventory.findByIdAndUpdate(req.params.id,{$set:NewInventory},{new:true}); //updating the existing or making it from scratch
    res.json({ver:updt,error:false,msg:"Updated Successfully"});
    } catch (errorr) {
        return res.status(500).send({error:true,msg:"Internal Server Error"+errorr})
    }
}
const DeleteInventory = async(req,res)=>{
    try {
        const aid = req.admin.id
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let id = await Inventory.findById(req.params.id);
        if(!id){
            return res.status(404).json({msg:"Inventory Item not found",error:true});
        }
        id = await Inventory.findByIdAndDelete(req.params.id);
        res.json({success: "Inventory Item has been Deleted",msg:"Deleted Sucessfully id#"+id,error:false});
    } catch (error) {
        return res.status(500).send({msg:"Internal Server Issue",error:true})
    }
}
const FiveInventory = async (req,res)=>{
    try {
        const aid = req.admin.id;
        let admin = await Admin.findById(aid);
        if(!admin){
            return res.status(400).send({msg:'This Admin Credtials are wrong',error:true})
        }
        let data = await Inventory.find().limit(5)
        res.json({all:data,len:data.length})
    } catch (error) {
        return res.status(500).send({error,msg:"Internal Server Error"})
    }
}
module.exports = {NewInventory,AllInventory,UpdateInventory,DeleteInventory,FiveInventory}
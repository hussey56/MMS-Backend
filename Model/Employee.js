const mongoose = require('mongoose');
const {Schema} = mongoose
const EmployeesSchema = new Schema({
name:{
    type:String,
    required:true,
},
password:{
type:String,
required:true,
},
gender:{
    type:String,
    required:true,
    default:'Prefer not to say'
},
dob:{
    type:Date,
    required:true,
},
phone:{
    type:String,
    required:true,
},
role_id:{
   type:mongoose.Schema.ObjectId,
   ref:'Emprole',
},
salary:{
    type:Number,
    required:true,
    default:15000,
},
bonus:{
    type:Number,
    required:true,
},
admin_id:{
    type:mongoose.Schema.ObjectId,
    ref:'Admin',
},
registered_at:{
    type:Date,
    default:Date.now()
}
});
module.exports = mongoose.model('Employee',EmployeesSchema)
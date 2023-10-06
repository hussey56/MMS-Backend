const mongoose = require('mongoose');
const {Schema} = mongoose
const AdminSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
type:String,
required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
type:Number,
required:true,
    },
    created_at:{
        type:Date,
        default:Date.now()
    }
});
module.exports  =mongoose.model('Admin',AdminSchema)
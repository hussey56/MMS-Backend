const mongoose = require('mongoose');
const {Schema} = mongoose;
const CustomerSchema = new Schema({
    name:{
type:String,
required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    registered_at:{
        type:Date,
        default:Date.now,
    }
});
module.exports = mongoose.model('Customer',CustomerSchema);
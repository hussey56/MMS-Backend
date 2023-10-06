const mongoose = require('mongoose')
const {Schema} = mongoose
const RoleSchema = new Schema({
name:{
    type:String,
    required:true,
},
created_by:{
    type:mongoose.Schema.ObjectId,
    ref:'Admin',
},
created_at:{
    type:Date,
    default:Date.now()
}
});
module.exports = mongoose.model('Emprole',RoleSchema)
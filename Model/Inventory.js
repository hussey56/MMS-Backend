const mongoose = require('mongoose')
const {Schema} = mongoose

const InventorySchema = new Schema({
    icon:{
        type:String,
        required:true
    },
    item:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    use:{
        type:Number,
        required:true,
    },
    reg_at:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('inventory',InventorySchema)
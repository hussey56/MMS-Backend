const mongoose = require('mongoose');
const {Schema} = mongoose
const EventSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price100:{
        type:Number,
        required:true,
    },
    price200:{
        type:Number,
        required:true,
    },
    price400:{
        type:Number,
        required:true,
    },
    price600:{
        type:Number,
        required:true,
    },
    perhour:{
        type:Number,
        required:true,
    },
    perday:{  
            type:Number,
            required:true,      
    },
    last_updated:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('event',EventSchema)
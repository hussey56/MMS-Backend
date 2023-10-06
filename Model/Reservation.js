const mongoose = require('mongoose');
const {Schema} = mongoose;
const ReservationSchema = new Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId, // by object id if the user model
        ref:'Customer'
    },
reservator_name:{
    type:String,
    required:true,
},
reservator_phone:{
    type:String,
    required:true,
},
guests:{
    type:String,
    required:true,
},
eventid:{
    type:String,
    required:true,
},
event_type:{
type:String,
required :true,
},
event:{
    type:Object,
    required:true,
},
price:{
    type:Number,
    required:true,
},
status:{
    type:String,
    required:true,
    default:'waiting',
},
time:{
    type:Date,
    default:Date.now,
}

});
module.exports = mongoose.model('reservation',ReservationSchema);
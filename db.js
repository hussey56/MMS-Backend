const mongoose = require('mongoose');
const URI =process.env.MONGO_URI;

const connectDb = ()=>{
    mongoose.connect(URI); 
}
if(connectDb){
    console.log("Connected To Database");
}
module.exports = connectDb;
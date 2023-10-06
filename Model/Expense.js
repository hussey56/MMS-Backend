const { default: mongoose } = require('mongoose');
const monoose = require('mongoose')
const {Schema} = monoose
const ExpenseSchema = new Schema({
month:{
type:String,
required:true,
},
year:{
    type:String,
    required:true,
},
labels:{
type:Array,
required:true,
},
background:{
    type:Array,
    required:true,
},
values:{
    type:Array,
    required:true,
},
percentage:{
    type:Array,
    required:true,
}
});
module.exports = mongoose.model('expense',ExpenseSchema)
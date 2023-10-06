const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Expense = require('../Model/Expense')
const Admin = require('../Model/Admin')
const Employee = require('../Model/Employee')

const calculatePercentages =(values)=> {
    const total = values.reduce((sum, value) => sum + value, 0);
    const percentages = values.map(value => (value / total) * 100);
    return percentages;
  }
const NewExpense = async(req,res)=>{
    try {
        const { labels, values,year,month } = req.body;
let backgroundColors = ["#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"]
  if (!Array.isArray(labels) || !Array.isArray(values) || labels.length !== values.length) {
    return res.status(400).json({ error:true,msg: 'Invalid input. Please provide valid labels and values arrays.' });
  }

  if (backgroundColors && !Array.isArray(backgroundColors) ) {
    return res.status(400).json({ error:true,msg: 'Invalid input. Background colors should be an array.' });
  }

  const percentages = calculatePercentages(values);

let expense = await Expense.findOne({month,year})
if(expense){
    return res.status(400).json({ error:true,msg: 'Same Date and Same year enteries has been done' });
}
expense = new Expense({
    month,
    year,
    labels,
    values,
    background:backgroundColors,
    percentage:percentages
})
const save = await expense.save()

  res.json({ expense,error:false });
    } catch (trouble) {
   return res.status(500).send({error:true,msg:trouble})     
    }
}
const LastData = async(req,res)=>{
    try {
      const d1 = await Expense.find({}).sort({_id:-1}).limit(1)
 if (!d1){
        return res.status(404).json({error:true,msg: 'No data found.'});
 }
 let data = d1[0]
      res.json({data,error:false});  
    } catch (trouble) {
        return res.status(500).send({error:true,msg:trouble})     
    }
}
const AllExpense =  async(req,res)=>{
  try {
    const expenses = await Expense.find().sort({_id:-1});
res.json({data:expenses,error:false})
  } catch (errorr) {
    return res.status(500).send({error:true,msg:errorr})
  }
}
const UpdateExpense = async(req,res)=>{
  try {
    const {month,year,values,labels} = req.body
    const Aid = req.admin.id;
let admin = await Admin.findById(Aid);
if(!admin){
return res.status(401).send({msg:"Invalid Admin Credentails",error:true})
} 
let id = await Expense.findById(req.params.id);
if(!id){
    return res.status(404).send({msg:"Item not found",error:true});
}
let backgroundColors = ["#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"]

const percentages = calculatePercentages(values);
let NewExpense = {}
if(month){
  NewExpense.month = month
}
if(year){
  NewExpense.year = year
}
if(percentages){
  NewExpense.percentage = percentages
}
if(values){
  NewExpense.values = values
}
if(labels){
  NewExpense.labels = labels
}
if(backgroundColors){
  NewExpense.background = backgroundColors
}
let updt = await Expense.findByIdAndUpdate(req.params.id,{$set:NewExpense},{new:true}); //updating the existing or making it from scratch
res.json({ver:updt,error:false,msg:"Updated Successfully"});
  } catch (errorr) {
    return res.status(500).send({error:true,msg:errorr})
  }
}
const CalculateExpense = async(req,res)=>{
  try {
    let name = await Expense.findOne({month:req.params.month,year:req.params.year})
    if(!name){
      return res.status(404).send({msg:"Expense Not Added yet",error:true,er:1});
  }
  const result = await Employee.aggregate([
    {
      $group: {
        _id: null,
        totalCombined: { $sum: { $add: ['$salary', '$bonus'] } },
      },
    },
  ]);
  let s1 = result[0].totalCombined
  const sum = await name.values.reduce((acc, value) => acc + value, 0);
  res.json({sum:sum+s1,error:false})
  } catch (errorr) {
    return res.status(500).send({error:true,msg:errorr,er:2})
  }
}
module.exports = {NewExpense,LastData,AllExpense,UpdateExpense,CalculateExpense}
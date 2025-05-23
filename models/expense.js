const mongoose = require('mongoose') 

const expenseSchema = new mongoose.Schema({
    user :{type:mongoose.Schema.Types.ObjectId,ref: 'User'},
    title :{type:String},
    amount :{type:Number},
    category:{type:String},
    createdAt : Date 
})

module.exports = mongoose.model('Expense',expenseSchema)
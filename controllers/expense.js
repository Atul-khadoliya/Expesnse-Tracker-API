const Expense = require('../models/expense')
const {subDays,subMonths,startOfDay,endOfDay} = require('date-fns')
const addExpense = async (req,res)=>{
   const user = req.user 
   const {title,amount,category,createdAt} = req.body
   // Use provided date or current date if not provided
   const creAt = createdAt ? new Date(createdAt) : new Date()
   try {
       const expense = new Expense({title,amount,category,createdAt:creAt,user})
       await expense.save()
       res.json({ msg: "success" })
   } catch (error) {
      res.status(400).json({error})
   }
}

const updateExpense = async (req,res)=>{
  try{
    const id = req.params.id 
  const {title,amount,category,createdAt} = req.body
  const expense = await Expense.findById(id)
  if(!expense) return res.status(400).json({msg:"does not exist"})
  
  if(expense.user.toString()!=req.user) return res.status(400).json({msg:"not authorized to update the expense"})
  
   expense.title = title || expense.title 
   expense.amount = amount || expense.amount 
   expense.category = category || expense.category 
   expense.createdAt = createdAt || expense.createdAt 
    
   await expense.save() 
   res.json({msg:"success"})
}catch(error){
    res.status(400).json({error})
}

  
}

const deleteExpense = async (req,res)=>{
    try {
         const id = req.params.id
         const expense = await Expense.findById(id)
         if(!expense) return res.status(400).json({msg:"does not exist"})
  
         if(expense.user.toString()!=req.user) return res.status(400).json({msg:"not authorized to delete the expense"})
         await expense.deleteOne()
        res.status(200).json({msg:'success'})
    } catch (error) {
        res.status(400).json(error)
    }

}

const getExpense = async (req, res) => {
    console.log('Query:', req.query);
    try {
        const id = req.user;
        const { filter, start, end } = req.query;
        let dateFilter = {};

        if (filter === 'week') {
            const oneWeekAgo = subDays(new Date(), 7);
            dateFilter.createdAt = { $gte: startOfDay(oneWeekAgo), $lte: endOfDay(new Date()) };
        } else if (filter === 'month') {
            const oneMonthAgo = subMonths(new Date(), 1);
            dateFilter.createdAt = { $gte: startOfDay(oneMonthAgo), $lte: endOfDay(new Date()) };
        } else if (filter === '3months') {
            const threeMonthsAgo = subMonths(new Date(), 3);
            dateFilter.createdAt = { $gte: startOfDay(threeMonthsAgo), $lte: endOfDay(new Date()) };
        } else if (start && end) {
            const stDate = new Date(start);
            const edDate = new Date(end);
            dateFilter.createdAt = { $gte: startOfDay(stDate), $lte: endOfDay(edDate) };
        }

        // Debug: log the filter
        console.log('Date filter:', dateFilter);

        const expenses = await Expense.find({
            user: id,
            ...dateFilter
        }).sort({ createdAt: -1 });

        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {addExpense,updateExpense,deleteExpense,getExpense}
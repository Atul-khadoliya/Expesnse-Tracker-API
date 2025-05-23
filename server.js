const express = require("express")
const app = express() 
const auth = require('./middleware/auth')
const authRoutes = require('./routers/user')
const expenseRouter = require('./routers/expense')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware 
app.use(express.json())

// routes
app.use('/expense',auth,expenseRouter)
app.use('/auth',authRoutes)
app.get('/',(req,res)=>{
    res.send('expense tracker')
})


const Start = async ()=>{
    try {
        const PORT = process.env.PORT || 3000 
        await connectDB()
        app.listen(PORT,()=>
            console.log(`connected to the server localhost/${3000}`)
        )
    } catch (error) {
        console.log(error)
    }
}
Start()
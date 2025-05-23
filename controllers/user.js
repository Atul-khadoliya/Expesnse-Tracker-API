const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req,res)=>{
    const {name,email,password} = req.body 
    const UserExist = await User.findOne({email}) 
    if(UserExist) return res.status(400).json({msg:'email already exist'})
   const hashpassword = await bcrypt.hash(password,10) 
    try {
       const user = new User({ name, email, password:hashpassword })
       await user.save()
       const token = jwt.sign({UserId:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
       res.json({token})
    } catch (error) {
        res.status(400).json({error})
    }
}


const logIn = async (req,res)=>{
      const {email,password} = req.body
      if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }
      const user = await User.findOne({email})
      if(!user) return res.status(400).json({msg:'invalid email'})
        if (!user.password) {
            return res.status(400).json({ msg: 'User password not set' });
        }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) return  res.status(400).json({msg:'invalid password'})
      
    const token = jwt.sign({UserId:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.json({token})
}
module.exports = {logIn,signUp}
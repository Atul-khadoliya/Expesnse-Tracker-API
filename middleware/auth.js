const jwt = require('jsonwebtoken')
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1] ;
    if(!token) return res.status(400).json({msg:'not authorized'})
    try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded.UserId
        next()
    } catch (error) {
       return  res.status(400).json({msg:'wrong token'})
    }
    
}
module.exports = auth
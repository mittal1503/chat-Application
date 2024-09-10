const jwt = require('jsonwebtoken');
const User = require("../models/userModel")
const asycnHandler = require("express-async-handler")

const authenticate = async(req,res,next) =>{

    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')){
        const token = req.headers.authorization.split(' ')[1]
        console.log("token",token)
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findOne({_id: decoded.id})
            next()
        }catch(error){
            res.status(401).json({message: 'Token is not valid'})
        }
    }

    if(!token)
    {
        res.status(401).json({message: 'Token is not provided'})
    }
}


module.exports = {authenticate}
const User = require('../models/user.model');

exports.getAllUsers = async (req,res,next) => {
    try{
        const users = await User.find();
    
        res.status(200).json({
            status:'success',
            results:users.length,
            data:{
                users
            }
        })
    }
    catch(err){
        res.status(500).json({
            status:'failed',
            error:err.message
        })
    }
}

exports.getUserByEmail = async(req,res,next) => {
    try{
        console.log(req.params.email);
        const user = await User.findOne({email: req.params.email});
        if(!user){
            return next(
                res.status(400).json({
                    status:'failed',
                    error:'Do not have user like this'
                })
            )
        }
        res.status(200).json({
            status:'success',
            data:{
                user
            }
        })

    }
    catch(err){
        res.status(500).json({
            status:'failed',
            error:err.message
        })
    }
}


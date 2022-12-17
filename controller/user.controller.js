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

exports.getUserById = async(req,res,next) => {
    try{
        const user = await User.findById( req.params.id);
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

exports.updateUserById = async(req,res,next) => {
    try{
        const filter = { _id:  req.params.id};
        const newUser = await User.findOneAndUpdate(filter,req.body,{new:true});

        res.status(200).json({
            status:'success',
            data:{
                newUser
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


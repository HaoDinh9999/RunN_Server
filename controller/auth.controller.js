const User = require('../models/user.model')

exports.signup =async (req,res,next) => {
    try{
        const {email, password} = req.body;

        const user =await User.findOne({email});
        if(!user){
            const newUser = await User.create(req.body);
            res.status(201).json({
                status:'success',
                data:{
                    user:newUser
                }
            })
        }
        else{
            res.status(400).json({
                status:'failed',
                error: "Your account have exists."
            })
        }
        
    }
    catch(err){
        res.status(500).json({
            status:'failed',
            error: err?.message
        })
    }
}

exports.login = async(req,res,next) => {
    try{
        const {email, password} = req.body;
    
        if(!email || !password){
            return next(
                res.status(400).json({
                    status:'failed',
                    error: 'Please provide email and password'
                })
            )
        }
    
        const user =await User.findOne({email}).select('+password');
    
        if(!user || !( await user.correctPassword(password,user.password))){
            return next(
                res.status(400).json({
                    status:'failed',
                    error: 'Incorrect email or password'
                })
            )
        }
    
        const token='';
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
            error: err?.message
        })
    }
}
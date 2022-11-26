const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, 'Please tell us your name'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type:String,
        required: [true, 'Please provide a password']
    },
    name:{
        type:String
    },
    photo: String,
});

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,12);
    next();

})

UserSchema.methods.correctPassword = async function (candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

const UserModel = mongoose.model('User', UserSchema);
module.exports= UserModel;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type: String,
        default: null
    },
    token:{
         type:String
    }
},{timestamps:true});

module.exports = mongoose. model('user', userSchema)
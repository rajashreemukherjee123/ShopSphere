const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name : {
        type : String,
        required : [true,"Name is required"],
        trim : true,
        validate:{
            validator:(nameValue)=>{
                return (/^(?=.{3,100}$)[A-Za-z]+(?:\s[A-Za-z]+)+$/).test(nameValue);
            },
            message : (prop)=>`${prop.value}Name length gretter than 3 char and gap between name and surname`
        }
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        trim : true,
        unique: true,
        lowercase: true,
        validate:{
            validator:(emailValue)=>{
                return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailValue);
            },
            message : (prop)=>`${prop.value} @ maintion in email`
        }
    },
    pass1 : {
        type : String,
        required : [true,"Password is required"]
    },
    agree: { 
        type: Boolean, 
        required: true 
    }, 
    newsletter: { 
        type: Boolean, 
        default: false 
    },
    created : {
        type : Date,
        default : Date.now
    }
},{versionKey:false});

module.exports = mongoose.model("user",userSchema);
console.log("userModel is ready to use");


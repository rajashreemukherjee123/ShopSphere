const user = require('../model/user.schema');

//import jwt
const jwt = require("jsonwebtoken");

//import bcryptjs
const bcrypt = require("bcryptjs");

function genHashPass(input){
    let saltRound = 10;
    let hashPass = bcrypt.hashSync(input,saltRound);
    return hashPass;
}


//--------------------------- Signup ---------------------------------
const userSignup = async(req,res)=>{
    try{
        //  1. Duplicate email check 
        let existingUser = await user.findOne({ email: req.body.email });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        //  2.  Terms check
        if(!req.body.agree){
            return res.status(400).json({ message: "Please accept terms" });
        }

        // user collection create
        let userObj = await user.create({
            name : req.body.name,
            email : req.body.email,
            pass1 : genHashPass(req.body.pass1),
            agree: req.body.agree,
            newsletter: req.body.newsletter
        });


        res.status(200).json({message: userObj});

    }catch(err){
        res.status(500).json({message : err.message})
    }

}


//--------------------------- Login ---------------------------------
const userLogin = async(req,res)=>{
    try{
        let userObj = await user.findOne({email : req.body.email});
        if(userObj){
            
            let dbPass = userObj.pass1;
            let pass1 = req.body.pass1;
            let isValid = bcrypt.compareSync(pass1,dbPass);
            if(isValid){
                 let token = jwt.sign({"user_id":userObj._id},process.env.JWT_SECRET,{expiresIn:"72h"});
                 res.status(200).json({"message":"Login Successfull",loginuser:userObj,token});
            }else{
                 res.status(401).json({"message":"unable to signin"});
            }
           
        }else{
            res.status(401).json({"message":"No user found"});
        }
    }catch(err){
        res.status(500).json(err);
    }

    
}

module.exports = {userSignup,userLogin};
console.log("userController is working");
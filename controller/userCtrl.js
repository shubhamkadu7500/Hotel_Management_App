const { model } = require('mongoose');
const User = require('../models/userModel');
const asyncHnadler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

const createUser = asyncHnadler(async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if(!findUser){
        //CREATE A NEW USER
        const newUser =await User.create(req.body);
        res.json(newUser); 
    }else{
        //user alredy exists
        // res.json({
        //     msg:"User Alredy Exists",
        //     success: false,
        // });
        throw new Error("User Already Exists");
    }
});

// getting email and password form login page
const loginUserCtrl = asyncHnadler(async(req,res)=>{
    const {email, password} = req.body;
    //check if user exist or not

    const findUser = await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatced(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),

        });
    }else{
        throw new Error("Invalid Credentials");
    }
    // console.log(email,password);
});


module.exports = {createUser, loginUserCtrl};
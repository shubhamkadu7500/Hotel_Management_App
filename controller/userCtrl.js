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

//update a user
const updatedUser = asyncHnadler(async(req,res)=>{
    const {id} = req.params;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new : true
        });
        res.json(updatedUser);

    }catch(error){
        throw new Error(error);
    }
});

//how to fetch or get all the user
const getallUser = asyncHnadler(async(req,res)=>{
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error){
        throw new Error(error);
    }
});

//get a single user
const getaUser = asyncHnadler(async(req,res)=>{
    // console.log(req.params);
    const {id} = req.params;
    // console.log(id);
    try{
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });
    }catch(error){
        throw new Error(error);
    }
});

//delete a single user
const deleteaUser = asyncHnadler(async(req,res)=>{
    // console.log(req.params);
    const {id} = req.params;
    try{
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser
        });
    }catch(error){
        throw new Error(error);
    }
});

module.exports = {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser};
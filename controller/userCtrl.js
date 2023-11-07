const { model } = require('mongoose');
const User = require('../models/userModel');
const asyncHnadler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbid');

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
    console.log();
    const { _id } =req.user;
    validateMongoDbId(_id);
    try{
        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },{
            new : true
        }
        );
        res.json(updatedUser);

    }catch(error){
        throw new Error(error);
    }
});

//get all the user

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
    console.log();
    const {id} = req.params;
    validateMongoDbId(id);
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
    console.log();
    const {id} = req.params;
    validateMongoDbId(_id);
    try{
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser
        });
    }catch(error){
        throw new Error(error);
    }
});

// block a user
const blockUser = asyncHnadler( async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const blockusr = await User.findByIdAndUpdate(
            id,
            {
            isBlocked:true,
        },
        {
            new:true,
        }
        );
        res.json(blockusr);
    }catch(error){
        throw new Error(error);
    }
});

// unblock a user
const unblockUser = asyncHnadler( async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const unblock = await User.findByIdAndUpdate(
            id,
            {
            isBlocked:false,
        },
        {
            new:true,
        }
        );
        res.json({
            message:"User UnBloacked",
        });
    }catch(error){
        throw new Error(error);
    }
});

module.exports = {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updatedUser, 
    blockUser, 
    unblockUser};
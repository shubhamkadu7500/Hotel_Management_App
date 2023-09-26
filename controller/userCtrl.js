const { model } = require('mongoose');
const User = require('../models/userModel');

const createUser = async(req,res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if(!findUser){
        //CREATE A NEW USER
        const newUser =await User.create(req.body);
        res.json(newUser); 
    }else{
        //user alredy exists
        res.json({
            msg:"User Alredy Exists",
            success: false,
        });
    }
};

module.exports = {createUser};
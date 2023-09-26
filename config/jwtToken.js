const jwt = require('jsonwebtoken');

//generating token and setting password expired time
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '3d'});
}

module.exports = { generateToken };
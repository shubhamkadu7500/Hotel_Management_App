const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try{
        const conn = mongoose.connect('mongodb://127.0.0.1:27017/digitic');
        console.log('Database Connected Successfully')
    }catch(error){
        console.log('Database error');
        // throw new Error(error);
    }
};
module.exports = dbConnect;
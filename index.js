const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv  = require('dotenv').config();
const PORT = 3000;
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/user', authRouter);
app.listen(PORT, ()=>{
    console.log(`the server are running at port ${PORT}`);
});
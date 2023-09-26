const express = require('express');
const { createUser, loginUserCtrl }= require('../controller/userCtrl');
const router = express.Router();

router.post('/register', createUser);//register router
router.post('/login', loginUserCtrl); //login router
module.exports = router;
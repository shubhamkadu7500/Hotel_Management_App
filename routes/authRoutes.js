const express = require('express');
const { 
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,

}= require('../controller/userCtrl');
const router = express.Router();

router.post('/register', createUser);//register router
router.post('/login', loginUserCtrl); //login router
router.get('/all-users', getallUser); //all-users
router.get('/:id', getaUser); // get single-user
router.delete('/:id', deleteaUser); //delete single-user
router.put('/:id', updatedUser); //update single-user
module.exports = router;
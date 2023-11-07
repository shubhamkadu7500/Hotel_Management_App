const express = require('express');
const { 
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,
    blockUser,
    unblockUser

}= require('../controller/userCtrl');
const { authMiddlerware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);//register router
router.post('/login', loginUserCtrl); //login router
router.get('/all-users', getallUser); //all-users
router.get('/:id', authMiddlerware, isAdmin, getaUser); // get single-user
router.delete('/:id', deleteaUser); //delete single-user
router.put('/edit-user', authMiddlerware, updatedUser); //update single-user
router.put('/block-user/:id', authMiddlerware, isAdmin, blockUser); //update single-user
router.put('/unblock-user/:id', authMiddlerware, isAdmin, unblockUser); //update single-user

module.exports = router;
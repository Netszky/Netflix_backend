const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const user = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const veryfyToken = require('../middlewares/verifyToken')




router.post('/register', user.register);
router.post('/login',user.login);
router.get('/get-user',veryfyToken, user.getUser);
router.put('/update-user', veryfyToken, user.updateUser);
router.get('/verify-token', veryfyToken, user.verify);
router.get('/verify-sub', veryfyToken, user.verifySub)
router.get('/verify-admin', verifyToken, user.verifyAdmin)
router.post('/get-order', veryfyToken, user.getOrder);
    
module.exports = router;

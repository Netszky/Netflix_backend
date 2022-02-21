const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const veryfyToken = require("../middlewares/verifyToken");

router.post("/",veryfyToken, checkoutController.createSession);

module.exports = router;
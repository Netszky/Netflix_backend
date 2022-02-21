const express = require('express');
const router = express.Router();
const checkoutRouter = require("./checkout.route");
const userRouter = require('./userRouter');
const webHooksRouter = require('./webhooks.route');

router.use("/users", userRouter);
router.use("/checkout", checkoutRouter);
router.use('/webhooks',webHooksRouter);

module.exports = router;
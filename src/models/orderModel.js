const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    name: String,
    amount: Number,
    create_date: {type: Date, default: Date.now, required: true},
    stripeId: String,
    isActive: Boolean
});

module.exports = mongoose.model("Order", orderSchema);
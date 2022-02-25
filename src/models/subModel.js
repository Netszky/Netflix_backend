const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema ({
    type: String,
    price: String,
    create_date: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Sub", subSchema);
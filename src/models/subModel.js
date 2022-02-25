const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema ({
    type: String,
    price: String
})

module.exports = mongoose.model("Sub", subSchema);
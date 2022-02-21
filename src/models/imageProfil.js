const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilImageSchema = new Schema ({
    url: {type: String, required: true}
})

module.exports = mongoose.model("profilImage", profilImageSchema);
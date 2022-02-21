const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serieSchema = new Schema ({
    create_date: {type: Date, default: Date.now, required: true},
    name: {type: String, required: true},
    categories: [{type: Schema.Types.ObjectId, ref:"Category"}],
    actor: [{type: Schema.Types.ObjectId, ref:"Person"}],
    duration: {type: String},
    director: [{type: Schema.Types.ObjectId, ref:"Person"}],
    year: Number,
    description: String
})

module.exports = mongoose.model("Serie", serieSchema);
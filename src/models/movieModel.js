const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema ({
    create_date: {type: Date, default: Date.now, required: true},
    name: {type: String, required: true},
    categories: [{type: Schema.Types.ObjectId, ref:"Category"}],
    actor: [{type: Schema.Types.ObjectId, ref:"Person"}],
    duration: {type: String, required:true},
    director: [{type: Schema.Types.ObjectId, ref:"Person"}],
    year: Number,
    description: String,
    image: {type: String, required: true},
    url: {type: String, required: true}

})

module.exports = mongoose.model("Movie", filmSchema);
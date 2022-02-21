const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
    ],
    onModel: {
        type: Schema.Types.ObjectId,
        enum: ['Serie', 'Movie']
    }
});

module.exports = mongoose.model('Profil', profilSchema);
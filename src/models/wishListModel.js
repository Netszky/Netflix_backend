const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
    wishlish: [{
        type: Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    ],
    onModel: {
        type: String,
        enum: ['Serie', 'Movie']
    }
})

module.exports = mongoose.model('Wishlist', wishListSchema);
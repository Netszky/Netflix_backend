const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:  {
        type: String,
        required: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isSub: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    stripeID: {
        type: String
    },
    sub: {
        type: Schema.Types.ObjectId, ref:"Sub"
    },
    profil: [{
        type: Schema.Types.ObjectId, ref:"Profil"
    }]

})

module.exports = mongoose.model('User', userSchema);
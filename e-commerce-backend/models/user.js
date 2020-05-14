const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlengh: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlengh: 32,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    history: [],
    role: {
        type: Number,
        default: 0
    },
    salt: String,
},  {timestamps: true});

// userSchema.virtual("password")
// .set(function(password) {
//     this._password = password;
//     this.salt = uuidv1;
//     this.hashed_password = this.encryptPassword(password)
// })
// .get(function() {
//     return this._password
// });

userSchema.methods = {
    authenticate: function(password) {
        return password === this.hashed_password;
    },
    // encryptPassword: function(password) {
    //     if(!password) return;
    //     try {
    //         return crypto.createHmac('sha1', this.alst).update(passwrod).digest("hex")
    //     } catch (err) {
    //         return 
    //     }
    // }
}

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String, unique:true, required:true},
    passwordHash: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
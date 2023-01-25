const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

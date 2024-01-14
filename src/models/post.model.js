import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    description: {
        type: String,
    },
    file: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String, // corrected from "string" to String
            required: true,
        },
    }],
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }]
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

export { Post };

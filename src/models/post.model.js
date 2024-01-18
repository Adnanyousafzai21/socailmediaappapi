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
            type: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                fullname: String,
                avater: String,
            },
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }]
}, { timestamps: true });

postSchema.path('comments.user').ref('User'); // Add this line to define the path

const Post = mongoose.model('Post', postSchema);

export { Post };




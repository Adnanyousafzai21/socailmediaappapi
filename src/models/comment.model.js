// comment.model.js
import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };

import mongoose, { Schema } from 'mongoose';

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Like = mongoose.model('Like', likeSchema);

export { Like };
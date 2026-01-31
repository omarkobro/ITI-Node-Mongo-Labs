import mongoose from 'mongoose';
import { postModelInteface } from '../types/post.types';

const postSchema = new mongoose.Schema<postModelInteface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

postSchema.index({ author: 1 }, { unique: true });
postSchema.index({ published: 1 });

const Post = mongoose.model<postModelInteface>('posts', postSchema);

export default Post;

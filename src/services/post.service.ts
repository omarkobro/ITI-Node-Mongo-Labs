import mongoose from 'mongoose';
import Post from '../models/post.model';
import { postInterface } from '../types/post.types';
import APIError from '../utils/APIError';

class postService {
  // GET ALL POSTS
  static async getAllPosts(userId?: string) {
    const posts = await Post.find().populate('author', 'name email').lean();

return posts.map(post => {
  const author = post.author as any;
  return {
    ...post,
    isOwner: userId ? author._id.toString() === userId : false,
  };
});
  }

  // CREATE POST
  static async createPost(post: postInterface, userId: string) {
    const newPost = await Post.create({
      ...post,
      author: new mongoose.Types.ObjectId(userId),
    });
    return newPost;
  }

  // GET POST BY ID
  static async getPostById(id: string, userId?: string) {
    const post = await Post.findById(id)
      .populate('author', 'name email')
      .lean();

    if (!post) return null;

    return {
      ...post,
  isOwner: userId ? post.author._id.toString() === userId : false,
    };
  }

  // UPDATE POST
  static async updatePostById(
    postId: string,
    updateData: Partial<postInterface>,
    userId: string,
  ) {
    const post = await Post.findById(postId);
    if (!post) return null;

    if (post.author.toString() !== userId) {
      throw new APIError('Forbidden', 403);
    }

    Object.assign(post, updateData);
    await post.save();
    return post;
  }

  // DELETE POST
  static async deletePostById(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) return null;

    if (post.author.toString() !== userId) {
      throw new APIError('Forbidden', 403);
    }

    await post.deleteOne();
    return post;
  }
}

export default postService;

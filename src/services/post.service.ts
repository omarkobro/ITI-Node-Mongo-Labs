import { ObjectId } from 'mongoose';
import Post from '../models/post.model';
import { postInterface } from '../types/post.types';

class postService {
  //get all posts
  static async getAllPosts() {
    const posts = await Post.find({});
    return posts;
  }

  //create Post

  static async createPost(post: postInterface) {
    const { title, content, author, tag, published } = post;

    const newPost = await Post.create({
      title,
      content,
      author,
      tag,
      published,
    });

    return newPost;
  }

  //get Post by ID
  static async getPostById(id: string) {
    const post = await Post.findById(id);
    return post;
  }

  static async updatePost(postId: string, updateData: Partial<postInterface>) {
    return Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  static async deletePostById(postId: string) {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  }
}

export default postService;

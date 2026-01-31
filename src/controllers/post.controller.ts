import { NextFunction, Request, Response } from 'express';
import postService from '../services/post.service';

class postController {
  static async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await postService.getAllPosts();
    return res
      .status(200)
      .json({ message: 'Posts Fetched successfully', data: posts });
  }

  static async getPostById(req: Request, res: Response, next: NextFunction) {
    const post = await postService.getPostById(req.params.id as string);

    return res
      .status(200)
      .json({ message: 'Post Fetched Successfully', data: post });
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    const post = await postService.createPost(req.body);
    return res
      .status(200)
      .json({ message: 'Post Created Successfully', data: post });
  }

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;
    const updatedPost = await postService.updatePost(
      postId as string,
      req.body,
    );

    res.status(200).json({ message: 'Post updated Successfully' });
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const deleted = await postService.deletePostById(id as string);

    if (!deleted) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.status(200).json({
      message: 'Post deleted successfully',
    });
  }
}

export default postController
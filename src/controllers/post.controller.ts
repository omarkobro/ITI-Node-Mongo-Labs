import { NextFunction, Request, Response } from 'express';
import postService from '../services/post.service';
import { IAuthRequest, IParamsWithId } from '../types';

class postController {
  // GET ALL POSTS
  static async getAllPosts(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts(req.user?.userId);

      return res.status(200).json({
        message: 'Posts fetched successfully',
        data: posts,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET POST BY ID
  static async getPostById(req: IAuthRequest & { params: IParamsWithId }, res: Response, next: NextFunction) {
    try {
      const post = await postService.getPostById(
        req.params.id,
        req.user?.userId,
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({
        message: 'Post fetched successfully',
        data: post,
      });
    } catch (err) {
      next(err);
    }
  }

  // CREATE POST
  static async createPost(req: IAuthRequest & { params: IParamsWithId }, res: Response, next: NextFunction) {
    try {
      const post = await postService.createPost(req.body as any, req.user!.userId);

      return res.status(201).json({
        message: 'Post created successfully',
        data: post,
      });
    } catch (err) {
      next(err);
    }
  }

  // UPDATE POST
  static async updatePost(req: IAuthRequest & { params: IParamsWithId }, res: Response, next: NextFunction) {
    try {
      const updatedPost = await postService.updatePostById(
        req.params.id,
        req.body as any,
        req.user!.userId,
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({
        message: 'Post updated successfully',
        data: updatedPost,
      });
    } catch (err) {
      next(err);
    }
  }

  // DELETE POST
  static async deletePost(req: IAuthRequest & { params: IParamsWithId }, res: Response, next: NextFunction) {
    try {
      const deletedPost = await postService.deletePostById(
        req.params.id,
        req.user!.userId,
      );

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({
        message: 'Post deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default postController;

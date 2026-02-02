import { Router } from 'express';
import postController from '../controllers/post.controller';
import validateSchema from '../middlewares/validator';
import { addPostSchema, updatePostSchema } from '../schemas/posts.validation';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, postController.getAllPosts);

router.get('/:id', authMiddleware, postController.getPostById);

router.post('/', authMiddleware, validateSchema(addPostSchema), postController.createPost);

router.put('/:id', authMiddleware, validateSchema(updatePostSchema), postController.updatePost);

router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
import { Router } from 'express';
import postController from '../controllers/post.controller';
import validateSchema from '../middlewares/validator';
import { addPostSchema, updatePostSchema } from '../schemas/posts.validation';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validateSchema(addPostSchema), postController.createPost);
router.put('/:id', validateSchema(updatePostSchema), postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;

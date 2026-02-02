import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validateSchema from '../middlewares/validator';
import { createUserSchema, signInSchema, signUpSchema } from '../schemas/users';

const router = Router();

router.get('/', UsersController.getAllUsers);

router.get('/:id', UsersController.getUserById);

router.post('/signUp', validateSchema(signUpSchema), UsersController.signUp);

router.post('/login', validateSchema(signInSchema), UsersController.signIn);

router.patch('/:id', UsersController.updateUser);

router.delete('/:id', UsersController.deleteUser);

export default router;

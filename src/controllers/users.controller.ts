import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { IParamsWithId } from '../types';

class UsersController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.getAllUsers();
    return res
      .status(200)
      .json({ message: 'Users fetched successfully', data: users });
  }

  static async getUserById(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await UserService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res
      .status(200)
      .json({ message: 'User fetched successfully', data: user });
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.signUp(req.body);

    return res.status(201).json({
      message: 'User created successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

static async signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const result = await UserService.signIn(email, password);

    return res.status(200).json({
      message: 'sign in successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

  static async updateUser(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await UserService.updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res
      .status(200)
      .json({ message: 'User updated successfully', data: user });
  }

  static async deleteUser(
    req: Request<IParamsWithId>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await UserService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'delete user with id' });
  }
}

export default UsersController;

import bcrypt from 'bcrypt';
import User from '../models/users';
import { ITokenPayload, IUser, IUserResponse } from '../types';
import APIError from '../utils/APIError';
import generateToken from '../utils/jwtGenerator';

class UserService {
  static async getAllUsers() {
    const users = await User.find({}, { password: 0 });
    return users;
  }

  static async signUp(user: IUser) {
    const { name, email, password, age } = user;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });
    const userObj = newUser.toObject() as IUserResponse;
    return userObj;
  }

  static async signIn(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new APIError('Invalid email or password', 401);
    }

    const macthedPasswords = await bcrypt.compare(password, user.password);
    if (!macthedPasswords) {
      throw new APIError('Invalid email or password', 401);
    }

    const payload: ITokenPayload = {
      userId: user._id.toString(),
      role: user.role,
    };
    const token = await generateToken(payload);

    return { accessToken: token, user };
  }

  static async getUserById(id: string) {
    const user = await User.findOne({ _id: id }, { password: 0 });
    return user;
  }

  static async updateUser(id: string, user: IUser) {
    const { name, email, age } = user;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { name, email, age },
      { new: true },
    );
    return updatedUser;
  }

  static async deleteUser(id: string) {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    return deletedUser;
  }
}

export default UserService;
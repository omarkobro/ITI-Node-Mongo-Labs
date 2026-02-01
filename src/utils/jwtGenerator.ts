import jwt from 'jsonwebtoken';
import APIError from './APIError';

async function generateToken(data: object): Promise<string> {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new APIError('internal Server Error', 500);
  }

  const options: jwt.SignOptions = {
    expiresIn: '1h',
  };

  return new Promise<string>((resolve, reject) => {
    jwt.sign(data, secretKey, options, (err, encoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(encoded!);
      }
    });
  });
}

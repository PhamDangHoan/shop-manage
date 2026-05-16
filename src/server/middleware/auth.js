import { verifyToken } from '../../utils/jwt.js';

export const authenticate = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};

export const requireAdmin = (user) => {
  if (user.role !== 'admin') throw new Error('Admin access required');
};
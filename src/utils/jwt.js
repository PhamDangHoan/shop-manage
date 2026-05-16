import crypto from 'crypto';
import { config } from '../config.js';

const base64Encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');

export const generateToken = (payload) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64Encode(header);
  const encodedPayload = base64Encode(payload);

  const signature = crypto
    .createHmac('sha256', config.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verifyToken = (token) => {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', config.JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) throw new Error('Invalid token');

    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    throw new Error('Invalid or expired token');
  }
};
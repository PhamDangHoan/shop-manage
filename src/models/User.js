import { readJson, writeJson } from '../utils/fileUtils.js';
import { config } from '../config.js';
import crypto from 'crypto';

export class User {
  static async getAll() {
    return readJson(config.USERS_FILE);
  }

  static async findByEmail(email) {
    const users = await User.getAll();
    return users.find(u => u.email === email);
  }

  static async create({ name, email, password }) {
    const users = await User.getAll();
    
    const existing = users.find(u => u.email === email);
    if (existing) throw new Error('Email already exists');

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hash,
      salt,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeJson(config.USERS_FILE, users);
    return { id: newUser.id, name, email, role: newUser.role };
  }

  static async verifyPassword(user, password) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    return hash === user.password;
  }
}
import { writeJson } from './utils/fileUtils.js';
import { config } from './config.js';
import crypto from 'crypto';

const seedData = async () => {
  // Products
  await writeJson(config.PRODUCTS_FILE, [
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 25000000,
      stock: 50,
      category: "Điện thoại"
    },
    {
      id: "2",
      name: "MacBook Air M3",
      price: 32000000,
      stock: 30,
      category: "Laptop"
    }
  ]);

  // Users - Có 1 Admin
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync('123456', salt, 1000, 64, 'sha512').toString('hex');

  await writeJson(config.USERS_FILE, [
    {
      id: "100",
      name: "Admin",
      email: "admin@gmail.com",
      password: hash,
      salt: salt,
      role: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "101",
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      password: hash,
      salt: salt,
      role: "user",
      createdAt: new Date().toISOString()
    }
  ]);

  console.log('✅ Seed data created! (Có Admin account)');
  console.log('Admin: admin@gmail.com / 123456');
};

seedData();
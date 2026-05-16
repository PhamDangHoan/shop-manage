import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey123456789',
  DATA_DIR: path.join(__dirname, 'data'),
  
  USERS_FILE: path.join(__dirname, 'data', 'users.json'),
  PRODUCTS_FILE: path.join(__dirname, 'data', 'products.json'),
  ORDERS_FILE: path.join(__dirname, 'data', 'orders.json'),
  CART_FILE: path.join(__dirname, 'data', 'cart.json'),
};
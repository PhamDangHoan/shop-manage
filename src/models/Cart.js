import { readJson, writeJson } from '../utils/fileUtils.js';
import { config } from '../config.js';

export class Cart {
  static async getByUserId(userId) {
    const carts = await readJson(config.CART_FILE);
    let cart = carts.find(c => c.userId === userId);
    
    if (!cart) {
      cart = { userId, items: [] };
      carts.push(cart);
      await writeJson(config.CART_FILE, carts); 
    }
    return cart;
  }

  static async addItem(userId, { productId, quantity = 1 }) {
    let carts = await readJson(config.CART_FILE);
    let cart = carts.find(c => c.userId === userId);

    if (!cart) {
      cart = { userId, items: [] };
      carts.push(cart);
    }

    const existing = cart.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await writeJson(config.CART_FILE, carts);
    return cart;
  }
}
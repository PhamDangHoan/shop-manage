import { readJson, writeJson } from '../utils/fileUtils.js';
import { config } from '../config.js';

export class Product {
  static async getAll() {
    return readJson(config.PRODUCTS_FILE);
  }

  static async getById(id) {
    const products = await Product.getAll();
    return products.find(p => p.id === id);
  }

  static async create(data) {
    const products = await Product.getAll();
    const newProduct = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    await writeJson(config.PRODUCTS_FILE, products);
    return newProduct;
  }

  static async update(id, data) {
    const products = await Product.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');

    products[index] = { ...products[index], ...data };
    await writeJson(config.PRODUCTS_FILE, products);
    return products[index];
  }

  static async delete(id) {
    const products = await Product.getAll();
    const filtered = products.filter(p => p.id !== id);
    await writeJson(config.PRODUCTS_FILE, filtered);
    return true;
  }
}
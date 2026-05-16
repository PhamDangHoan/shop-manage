import { readJson, writeJson } from '../utils/fileUtils.js';
import { config } from '../config.js';

export class Order {
  static async getAll() {
    return readJson(config.ORDERS_FILE);
  }

  static async getByUserId(userId) {
    const orders = await Order.getAll();
    return orders.filter(o => o.userId === userId);
  }

  static async create(orderData) {
    const orders = await Order.getAll();
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    await writeJson(config.ORDERS_FILE, orders);
    return newOrder;
  }
}
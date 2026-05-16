import chalk from 'chalk';
import { Order } from '../../models/Order.js';
import { parseArgs } from '../utils/parser.js';

export const create = async (args) => {
  const opts = parseArgs(args);
  try {
    const products = opts.products.split(',').map(item => {
      const [productId, quantity] = item.split(':');
      return { productId, quantity: Number(quantity) };
    });

    const order = await Order.create({
      userId: opts.userId,
      products,
      total: 0 // có thể tính sau
    });

    console.log(chalk.green('✓ Tạo đơn hàng thành công!'));
    console.log(order);
  } catch (err) {
    console.log(chalk.red('❌ Lỗi:'), err.message);
  }
};

export const list = async (args) => {
  const opts = parseArgs(args);
  const orders = await Order.getByUserId(opts.userId);
  console.log(chalk.blue(`\nĐơn hàng của user ${opts.userId}:`));
  console.table(orders);
};
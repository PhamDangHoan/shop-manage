import chalk from 'chalk';
import { Product } from '../../models/Product.js';
import { parseArgs } from '../utils/parser.js';

export const list = async () => { 
  const products = await Product.getAll();
  console.log(chalk.blue('\n📋 Danh sách sản phẩm:'));
  if (products.length === 0) {
    console.log(chalk.yellow('Chưa có sản phẩm nào.'));
    return;
  }
  console.table(products.map(p => ({
    ID: p.id,
    Tên: p.name,
    Giá: Number(p.price).toLocaleString('vi-VN') + ' ₫',
    Stock: p.stock,
    Danh_mục: p.category
  })));
};

export const add = async (args) => { 
  const opts = parseArgs(args);
  try {
    const product = await Product.create({
      name: opts.name,
      price: Number(opts.price),
      stock: Number(opts.stock || 0),
      category: opts.category
    });
    console.log(chalk.green('✅ Thêm sản phẩm thành công!'));
    console.log(product);
  } catch (err) {
    console.log(chalk.red('❌ Lỗi:'), err.message);
  }
};

export const update = async (args) => {
  const opts = parseArgs(args);
  try {
    if (!opts.id) throw new Error('Thiếu --id');
    const updated = await Product.update(opts.id, {
      name: opts.name,
      price: opts.price ? Number(opts.price) : undefined,
      stock: opts.stock ? Number(opts.stock) : undefined,
      category: opts.category
    });
    console.log(chalk.green('✅ Cập nhật thành công!'));
    console.log(updated);
  } catch (err) {
    console.log(chalk.red('❌ Lỗi:'), err.message);
  }
};

export const remove = async (args) => {   // delete là từ khóa, dùng remove
  const opts = parseArgs(args);
  try {
    if (!opts.id) throw new Error('Thiếu --id');
    await Product.delete(opts.id);
    console.log(chalk.green(`✅ Đã xóa sản phẩm ID: ${opts.id}`));
  } catch (err) {
    console.log(chalk.red('❌ Lỗi:'), err.message);
  }
};
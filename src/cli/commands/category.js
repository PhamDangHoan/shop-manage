import chalk from 'chalk';
import { parseArgs } from '../utils/parser.js';

export const list = async () => {
  console.log(chalk.blue('\nDanh mục: Điện thoại, Laptop, Phụ kiện...'));
};

export const add = async (args) => {
  const opts = parseArgs(args);
  console.log(chalk.green(`✓ Đã thêm danh mục: ${opts.name}`));
};